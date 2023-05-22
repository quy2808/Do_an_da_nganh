import paho.mqtt.client as mqtt #import the client1
import time
import json
import random
import mysqlServer

############
MQTT_SERVER = "io.adafruit.com"
MQTT_PORT = 1883
MQTT_USERNAME   = "thonghuynhthanh"
MQTT_PASSWORD   = "aio_fuaC55KGa7zgLYReO4Cqn3XzJzRa"
MQTT_TOPIC   = "thonghuynhthanh/feeds/testdadn/json"
BATTHUONG_TOPIC = "thonghuynhthanh/feeds/batthuong/json"
########################################
def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)
    
def pushVal(client, topic, data):
    # client.on_message = on_message
    client.publish(topic, data)
    client.subscribe(topic)
########################################
broker_address="io.adafruit.com"
print("creating new instance")
client = mqtt.Client("P1") #create new instance
client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
print("connecting to broker")
client.connect(broker_address) #connect to broker

client.loop_start() # start the loop
# client.on_message=on_message #attach function to callback
# client.publish(MQTT_TOPIC,"!temp:26.6;doam:45.0;light:21#")
# print("Subscribing to topic",MQTT_TOPIC)
# client.subscribe(MQTT_TOPIC)
# print("Publishing message to topic",MQTT_TOPIC)
num = 10
while num > 0:
    temp = round(random.randint(20, 25) + random.random(), 2)
    doamdat = round(random.randint(40, 42) + random.random(), 2)
    doamkhongkhi = round(random.randint(37, 40) + random.random(), 2)
    anhsang = round(random.randint(20, 25) + random.random(), 2)
    
    pushVal(client, MQTT_TOPIC, f"!temp:{temp};doamdat:{doamdat};doamkhongkhi:{doamkhongkhi};light:{anhsang}#")
    time.sleep(5) # wait
    mysqlServer.updateRecord()
    num -= 1
    
    
pushVal(client, BATTHUONG_TOPIC, f"!thoigian:2023-05-20T02:26:30Z;temp:90;doamdat:;doamkhongkhi:;light:#")
time.sleep(5) # wait
client.loop_stop() #stop the loop
mysqlServer.updateRecordReminder()
