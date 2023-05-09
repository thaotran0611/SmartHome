from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request
import pandas
import pymysql.cursors
import json
from flask_marshmallow import Marshmallow
import database as db
from datetime import datetime
import re
from gateway import *
ma = Marshmallow

app = Flask(__name__)


@app.route('/get', methods = ['GET'])
def index():
    return jsonify({'name': 'alice',
                    'email': 'alice@outlook.com'})


@app.route('/login', methods = ['POST'])
def login():
    if request.method == "GET":
        return "wrong request"
    if request.method == "POST":
        email = request.json['email']
        password = request.json['password']
        database = db.dbcon()
        mycursor = database.cursor()
        sql = "SELECT * FROM `users` WHERE Email = %s AND Password = %s"
        input = (email, password)
        resp = {'result': False, 'user': None}
        try:
            mycursor.execute(sql, input)
            myresults = mycursor.fetchall()
            for row in myresults:
                UserID = row['UserID']
                Fname = row['Fname']
                Lname = row['Lname']
                Gender = row['GENDER']
                Birthday = row['Birthday']
                Birthday = Birthday.strftime(('%m/%d/%Y'))
                Email = row['Email']
                Img = row['Img1']
                timeline = row['timeline'].strftime(('%m/%d/%Y %H:%M:%S'))
                break
            if len(myresults) == 1:
                resp['result'] = True
                resp['comments'] = "one user found"
                resp['UserID'] = UserID
                resp['Fname'] = Fname
                resp['Lname'] = Lname
                resp['GENDER'] = Gender
                resp['Birthday'] = Birthday
                resp['Img1'] = Img
                resp['Email'] = Email
                resp['timeline'] = timeline
                print(Img)
            elif len(myresults) == 0:
                resp['comments'] = "No users"
            else:
                resp['comments'] = "multiple users!!"
        except:
            print("Error: unable to fetch data")
        database.close()
        return json.dumps(resp)
    
@app.route('/signup',methods=["POST"])
def signup():
    fname = request.json["fname"]
    lname = request.json["lname"]
    gender = request.json["gender"]
    birthday = request.json["birthday"]
    img1 = request.json["img1"]
    img2 = request.json["img2"]
    img3 = request.json["img3"]
    img4 = request.json["img4"]
    img5 = request.json["img5"]
    email = request.json["email"]
    password = request.json["password"]
    timeline = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(fname, lname, gender, birthday, img1, img2, img3, img4, img5, email, password, timeline)
    print("hello", request.json)
    isActive = 0
    
    database = db.dbcon()
    mycursor = database.cursor()

    mycursor.execute('SELECT * FROM users WHERE email = % s', (email))
    account = mycursor.fetchone()
    if account:
        msg = 'Account already exists !'
    elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        msg = 'Invalid email address !'
    else:
        try:
            sql = "INSERT INTO users (Fname,Lname,GENDER,Birthday,Img1,Img2,Img3, Img4, Img5, Email, isAthome,timeline ,Password) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            input = (fname,lname,gender,'2002-02-01',img1,img2,img3,img4,img5,email,isActive,timeline,password)
            res = mycursor.execute(sql, input)
            print(res)
            database.commit()
            msg = "success"
        except:
            msg = "failed"
            
    database.close()
    return json.dumps(msg)

@app.route('/users', methods=['GET'])
def getUsers():
    database = db.dbcon()
    mycursor = database.cursor()
    try:
        mycursor.execute("""SELECT UserID, LName, isAthome, timeline, Img1 FROM users;""")
        result = mycursor.fetchall()
    except:
        result = "failed"
    database.close()
    return jsonify(result)

@app.route('/img', methods = ['POST'])
def getImg():
    UserID = request.json["UserID"]
    database = db.dbcon()
    mycursor = database.cursor()
    try:
        mycursor.execute("""SELECT Img1 FROM users WHERE UserID = % s;""", (UserID))
        result = mycursor.fetchall()
    except:
        result = "failed"
    database.close()
    return jsonify(result)

@app.route('/roundChart', methods=['GET'])
def roundChart():
    database=db.dbcon()
    mycursor = database.cursor()
    try:
        mycursor.execute(""" select RoomName as name , round(sum(performance*working_hours),1) as Value
                            from contain natural join devices natural join rooms
                            group by RoomName;
                        """)
        result = mycursor.fetchall()
    except:
        result = "failed"
    database.close()
    return json.dumps(result)

@app.route('/device', methods=['POST'])
def getInfoDevice():
    room = request.json["RoomID"]
    print('httt.'+room.casefold() + '_fan')
    fan_status = get_status(clientHistory,'httt.'+room.casefold() + '-fan')
    led_status = get_status(clientHistory,'httt.'+room.casefold() + '-led')
    result = [int(fan_status),bool(int(led_status))]
    print(result)
    return json.dumps(result)

@app.route('/blog', methods=['POST'])
def blog():
    room = request.json["RoomID"]
    fan_history=get_history(clientHistory,'httt.'+room.casefold() + '-fan')
    led_history=get_history(clientHistory,'httt.'+room.casefold() + '-led')
    result = [fan_history,led_history]
    print(result)
    return jsonify(result)

@app.route('/control',methods=['POST'])
def control():
    room = request.json["RoomID"]
    database = db.dbcon()
    mycursor = database.cursor()
    type = request.json['type']
    value = request.json['command']
    feed_name ='httt.' + room.casefold() + '-' + type.casefold()
    controlDevice(feed_name,value)
    mycursor.execute(
            """SELECT isActive FROM smarthome.contain natural join devices 
            WHERE Type=%s AND RoomID=%s;""",(type,room))
    status = mycursor.fetchall()
    status = status[0]['isActive']
    if value == 0: 
        if status !=0 :
            mycursor.execute(
                '''UPDATE contain, devices SET contain.isActive = 0 
                , contain.working_hours=contain.working_hours+ROUND(TIMESTAMPDIFF(MINUTE,contain.start_active,CURRENT_TIMESTAMP())/60,1)
                , contain.start_active=CURRENT_TIMESTAMP()
                WHERE contain.DCODE=devices.DCODE AND Type=%s AND RoomID=%s;''',(type,room))
            database.commit()
    else: 
        if status == 0 :
            mycursor.execute('''UPDATE contain, devices SET contain.isActive = 1 , contain.start_active=CURRENT_TIMESTAMP()
                WHERE contain.DCODE=devices.DCODE AND Type=%s AND RoomID=%s;''',(type,room))
            database.commit()
    mess = "success"
    return jsonify(mess)

@app.route('/sensor', methods = ['POST'])
def sensor():
    sensor = request.json["sensor"]
    step = request.json["step"]
    sensor_history = get_history_sensor(sensor, step)
    print(sensor_history)
    return jsonify(sensor_history)

@app.route('/sensornow', methods = ['GET'])
def sensornow():
    temp = get_status(clientHistory, 'httt.temp')
    lux = get_status(clientHistory, 'httt.lux')
    result = [temp, lux]
    print(result)
    return jsonify(result)

@app.route('/door', methods = ['GET'])
def door():
    door = get_status(clientHistory, 'httt.door')
    return jsonify(int(door))

@app.route('/doorChange', methods = ['POST'])
def doorChange():
    status = request.json['status']
    controlDevice('httt.door', 1 if status else 0)
    return jsonify("success")

@app.route('/noti', methods=['GET'])
def notif():
    database = db.dbcon()
    mycursor = database.cursor()
    mycursor.execute(
                '''SELECT * FROM GUEST WHERE 
            ROUND(TIMESTAMPDIFF(MINUTE,TIM,CURRENT_TIMESTAMP()),1) <40;'''
            )
    res = mycursor.fetchall()
    if res == []:
        return jsonify(res)
    else: 
        # mycursor.execute(
        #         '''UPDATE GUEST SET notification = 1 WHERE notification=0 AND status =1 AND
        #     ROUND(TIMESTAMPDIFF(MINUTE,TIM,CURRENT_TIMESTAMP()),1) <5;'''
        #     )
        database.commit()
        return jsonify(res)

app.run()

if __name__ == "__main__":
    app.run(debug=True)
