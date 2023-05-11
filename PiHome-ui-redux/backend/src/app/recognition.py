from deepface import DeepFace
import pandas as pd
import database as db
import pymysql.cursors

def recoginition(image_path):    
    result = DeepFace.find(img_path =image_path, db_path ="D:/HK222/DA_HTTT/SmartHomeApp/SmartHome/PiHome-ui-redux/backend/src/app/Photo",detector_backend="retinaface", distance_metric="euclidean_l2")
    print(result) 
    name = result[0].iloc[0,0].split('/')[-1]
    distance = result[0].iloc[0,5]
    print(name , distance)
    image_path = image_path.split('/')[-1]
    print(image_path)
    if distance < 0.8 : return name, True
    else: return image_path, False

def authentication(status, name):
    img, res = recoginition(name)
    database = db.dbcon()
    mycursor = database.cursor()
    if res: 
        mycursor.execute(
                '''UPDATE users SET isAthome=%s, timeline=CURRENT_TIMESTAMP() 
                WHERE Img1=%s OR Img2=%s OR Img3=%s OR Img4=%s OR  Img5=%s;'''
            ,(status,img,img,img,img,img))
        database.commit()
    else: 
        mycursor.execute(
                '''INSERT INTO guest (TIM, img, status) VALUES (CURRENT_TIMESTAMP(),%s,%s);'''
            ,(img,status))
        database.commit()
    
path = 'D:/HK222/DA_HTTT/SmartHomeApp/SmartHome/PiHome-ui-redux/mobile/Passengers/passenger1.jpg'
authentication(True,path)