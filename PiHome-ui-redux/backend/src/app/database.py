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