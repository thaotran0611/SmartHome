from Adafruit_IO import MQTTClient, Client
import sys
from uart import *

AIO_FEED_ID = ["httt.temp", "httt.lux", "httt.fan1", "httt.light1"]
AIO_USERNAME = "HungK"
AIO_KEY = "aio_CiGg66FT8Eh9xdlYv90QvqNqcUeA"

def subscribe(client , userdata , mid , granted_qos):
    print("Subcribe thanh cong...")

def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_ID: # ket noi den nhieu feed
        client.subscribe(feed)
        print ("Subcribe to: " + feed)
        
def disconnected(client):
    print("Ngat ket noi...", client)
    sys.exit (1)
    
clientMQTT = MQTTClient(AIO_USERNAME , AIO_KEY) # client nay dung de gui va nhan 1 du lieu den feed
clientHistory = Client(AIO_USERNAME, AIO_KEY) # client nay dung de lay du lieu lich su cua feed
clientMQTT.on_connect = connected
clientMQTT.on_disconnect = disconnected
clientMQTT.on_message = message
clientMQTT.on_subscribe = subscribe
clientMQTT.connect()
clientMQTT.loop_background()

