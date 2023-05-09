import sys
from uart import *
import time
import json
import random
from connect import *
from datetime import date, datetime
import pytz

# from create_data import *

def get_status(client, feed_id):
    return client.receive(feed_id).value

# get all data from feed
def get_history(client, feed_id):
    # Retrieve historical data for a feed
    data_list = client.data(feed_id)
    gmt7_timezone = pytz.timezone('Asia/Jakarta')
    
    data_list_parse = [] # list nay chi lay ra 2 du lieu la created_at va value trong data_list
    for data in data_list:
        utc_time = data.created_at
        input_format = '%Y-%m-%dT%H:%M:%SZ'
        # Convert the string to a datetime object
        input_datetime = datetime.strptime(utc_time, input_format)
        # Convert the datetime object to GMT+7 timezone
        local_datetime = pytz.utc.localize(input_datetime).astimezone(gmt7_timezone)
        # Convert the datetime object back to a string in ISO format with UTC time zone indicator
        local_time_str = local_datetime.strftime('%Y-%m-%dT%H:%M:%SZ')
        temp = local_time_str.split('T')
        dates = datetime.strptime(temp[0], "%Y-%m-%d").date()
        times = datetime.strptime(temp[1][:-1], "%H:%M:%S").time()
        if date.today() == dates:
            data_list_parse.append({
                "created_at": str(times),
                "value": data.value
            })
        else: break
    # Return the fan history list
    return data_list_parse

def get_history_sensor(sensor, step):
    """
    This function retrieves the value of a sensor between 0:00 and 23:59 of today, with a specified step size.

    Args:
    - sensor (str): the name of the sensor ('temp' or 'lux').
    - step (int): the step size in hours.

    Returns:
    - A list of strings, where each string contains the hour and the value of the last reading taken within that hour.

    Example:
    If the current time is 14:45:00:
    >>> get_history_sensor('temp', 3)
    ['14:45:00 27', '11:45:00 26', '08:45:00 29', '05:45:00 25', '02:45:00 24']
    """

    # construct the feed ID from the sensor name
    feed_id = 'httt.' + sensor

    # get the sensor data from the server, from newest
    data_list = get_history(clientHistory, feed_id)

    # iterate over the sensor data, storing the last reading for each hour in hour_dict
    hour_step = int(datetime.now().time().hour) 
    # print("-----+++++", hour_step)
    # hour_next = hour_step - step
    value_list = []
    # value_list.append(data_list[0])
    if hour_step%2 == 0: date_time = hour_step
    else: date_time = hour_step - 1
    index = 0
    while date_time >= 0:
        hour = int(data_list[index]['created_at'][0:2])
        if hour == date_time:
            value_list = [{'hour': str(int(data_list[index]['created_at'][0:2])) + 'h', 'value':int(data_list[index]['value'])}] + value_list
            date_time = date_time - step
            index = index + 1
        elif hour > date_time: index = index + 1
        else:
            value_list = [{'hour': str(date_time) + 'h', 'value': 0}] + value_list
            date_time = date_time - step

        
    # for data in data_list:
    #     hour = int(data['created_at'][0:2]) 
    #     if hour == date_time:
    #         if hour == 2: 
    #             print('*********')
    #         value_list = [{'hour': str(int(data['created_at'][0:2])) + 'h', 'value':int(data['value'])}] + value_list
    #         date_time = date_time - step
    #     elif hour <= date_time - step:
    #         if hour == 2: 
    #             print('------------>',date_time - step )
    #         value_list = [{'hour': str(date_time) + 'h', 'value': 0}] + value_list
    #         date_time = date_time - step
    #     if date_time < 0: break
    return value_list

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
    # gui den microbit
    message(clientMQTT, name, str(value)) 
    # gui den adafruit
    clientMQTT.publish(name, value)
   
    

def randomControlDevice():
    nameDeviceFeed = ["httt.br1-led", "httt.ber1-fan" , "httt.ber1-led", "httt.kc-led", "httt.lr-fan", "httt.lr-led"]
    selected_device = random.choice(nameDeviceFeed)
    controlDevice(selected_device)

'''   
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
'''   
