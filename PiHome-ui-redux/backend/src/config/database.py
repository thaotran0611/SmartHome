import pymysql.cursors
import json

def dbcon():
    database = pymysql.connect(
        host="localhost",
        port=3006,
        user='root',
        password='Dhad_2016',
        database='smarthome',
        cursorclass=pymysql.cursors.DictCursor,
    )
    return database
    # mycursor = database.cursor()
    # email = 'anhduc123@gmail.com'
    # password = '123'
    # sql = "SELECT * FROM `users` WHERE Email = %s AND Password = %s"
    # input = (email, password)
    # resp = {'result': False, 'user': None}
    # try:
    #     mycursor.execute(sql, input)
    #     myresults = mycursor.fetchall()
    #     for row in myresults:
    #         print("im here")
    #         print(row['UserID'])
    #         user = row['Fname']
    #         token = row['Email']
    #         break
    #     if len(myresults) == 1:
    #         resp['result'] = True
    #         resp['comments'] = "one user found"
    #         resp['user'] = user
    #         resp['token'] = token
    #     elif len(myresults) == 0:
    #         resp['comments'] = "No users"
    #     else:
    #         resp['comments'] = "multiple users!!"
    # except:
    #     print("Error: unable to fetch data")
    # database.close()
    # return resp

