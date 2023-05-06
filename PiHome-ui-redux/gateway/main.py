import sys
from Adafruit_IO import MQTTClient
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
def getTempRandom():
    value = random.randint(20, 38)
    print("Temperature: ", value, " .C")
    clientMQTT.publish("httt.temp", value)
    
def getLuxRandom():
    # lux 0 is night, 100.000 is direct sunlight
    value = random.randint(0 , 100000)
    print("Lux: ", value)
    clientMQTT.publish("httt.lux", value)
    
def fanControl(value = random.randint(0, 5)):
    print("Fan control: ", value)
    
    # ghi len adafruit
    clientMQTT.publish("httt.fan1", value)
    
    # control fan in gateway
    # writeData(value)
    
def lightControl(value = random.randint(0, 1)):
    print("Light control: ", value)

    # ghi len adafruit
    clientMQTT.publish("httt.light1", value)
    
    # control fan in gateway
    # writeData(value)
    
    
if __name__ == '__main__':
    fanData = get_history(clientHistory, "httt.fan1")
    tempData = get_history(clientHistory, "httt.temp")
    for temp in tempData:
        print(temp)
    while True:
        
            
        # doc du lieu nhan duoc moi 3 giay tu microbit
        # readSerial()
        getTempRandom()
        getLuxRandom() 
        fanControl()
        lightControl()
        time.sleep(5)
    
