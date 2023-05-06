from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, request
import pandas
import pymysql.cursors
import json
from flask_marshmallow import Marshmallow
import database as db
from datetime import datetime
import re
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
        mycursor.execute(""" SELECT LName, isAthome, timeline, Img1 FROM users;""")
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
        mycursor.execute(""" select RoomName , round(sum(performance*working_hours),1) as Value
                            from contain natural join devices natural join rooms
                            group by RoomName;
                        """)
        result = mycursor.fetchall()
    except:
        result = "failed"
    
    database.close()
    return json.dumps(result)
app.run()



if __name__ == "__main__":
    app.run(debug=True)
