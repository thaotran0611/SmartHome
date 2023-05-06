import sys
from uart import *
import time
import json
import random
from connect import *
# from create_data import *

# get all data from feed
def get_history(client, feed_id):
    # Retrieve historical data for a feed
    data_list = client.data(feed_id)
    # data_list_recent = client.receive_data(feed_id)
    # Create a list of fan history from the data
    
    data_list_parse = [] # list nay chi lay ra 2 du lieu la created_at va value trong data_list
    for data in data_list:
        data_list_parse.append({
            "created_at": data.created_at,
            "value": data.value
        })
    # Return the fan history list
    return data_list_parse
def randomGetTemp():
    value = random.randint(20, 38)
    print("Temperature: ", value, " .C")
    clientMQTT.publish("httt.temp", value)
    
def randomGetLux():
    # lux 0 is night, 100.000 is direct sunlight
    value = random.randint(0 , 100000)
    print("Lux: ", value)
    clientMQTT.publish("httt.lux", value)
    
    
# _____________________________________________________________
# dieu khien thiet bi
# name: ten cua thiet bi
# value: gia tri dieu khien, neu la LED thi 0/1, neu la FAN 0-5
def controlDevice(name, value = -1):
    # neu khong nhan duoc gia tri, thi random
    if "led" in name:
        value = value if value != -1 else random.randint(0, 1) 
    elif "fan" in name:
        value = value if value != -1 else random.randint(0, 5)
    # gui den adafruit
    clientMQTT.publish(name, value)
    # gui den microbit
    message(clientMQTT, name, str(value)) 
    

def randomControlDevice():
    nameDeviceFeed = ["httt.br1-led", "httt.ber1-fan" , "httt.ber1-led", "httt.kc-led", "httt.lr-fan", "httt.lr-led"]
    selected_device = random.choice(nameDeviceFeed)
    controlDevice(selected_device)
    
if __name__ == '__main__':
    # fanData = get_history(clientHistory, "httt.fan1")
    # tempData = get_history(clientHistory, "httt.temp")
    # for temp in tempData:
    #     print(temp)
    # Create the group if it doesn't already exist

    # Create the feed if it doesn't already exist
    
    while True:
        
            
        # doc du lieu nhan duoc moi 3 giay tu microbit
        # readSerial()
        randomGetTemp()
        randomGetLux() 
        randomControlDevice()
        print("________________________")
        time.sleep(5)
    
