import requests
from dateutil import parser, tz
import pytz
import paho.mqtt.client as mqtt #import the client1

# Set up the Adafruit IO REST API URL and key
AIO_URL_DATA = 'https://io.adafruit.com/api/v2/thonghuynhthanh/feeds/testdadn/data'
AIO_URL_DATA_REMINDER = 'https://io.adafruit.com/api/v2/thonghuynhthanh/feeds/batthuong/data'
AIO_URL = 'https://io.adafruit.com/api/v2/thonghuynhthanh/feeds/testdadn'
AIO_KEY = 'aio_fuaC55KGa7zgLYReO4Cqn3XzJzRa'
LUX_TOPIC   = "thonghuynhthanh/feeds/anhsang/json"
TEMP_TOPIC   = "thonghuynhthanh/feeds/nhietdo/json"
HUM_A_TOPIC   = "thonghuynhthanh/feeds/doamkhongkhi/json"
HUM_B_TOPIC   = "thonghuynhthanh/feeds/doamdat/json"
CANHBAO_TOPIC = "thonghuynhthanh/feeds/canhbao/json"
BATTHUONG_TOPIC = "thonghuynhthanh/feeds/batthuong/json"

MQTT_PASSWORD   = "aio_fuaC55KGa7zgLYReO4Cqn3XzJzRa"
MQTT_USERNAME   = "thonghuynhthanh"

client = mqtt.Client("P1") #create new instance
client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
client.connect("io.adafruit.com") #connect to broker

# Set up the HTTP headers
headers = {'X-AIO-Key': AIO_KEY}
params = {'limit': 1}  
# Make the API request to retrieve all the data from the feed

def getLastRecord():
    response = requests.get(AIO_URL_DATA, headers=headers, params=params)
    # Parse the response JSON and print the data values
    data = response.json()
    values = data[0]['value'][1:-1].split(';')
    values = [float(val.split(":")[1]) for val in values]
    created_at_str = data[0]['created_at']
    # Convert the timestamp string to a DateTime object
    tz_vietnam = pytz.timezone('Asia/Ho_Chi_Minh')

    created_at_dt = parser.parse(created_at_str).astimezone(tz_vietnam)

    # Print the DateTime object
    # YYYY-MM-DD hh:mm:ss
    return created_at_dt.strftime('%Y-%m-%d %H:%M:%S'), *values

def getLastRecordReminder():
    response = requests.get(AIO_URL_DATA_REMINDER, headers=headers, params=params)
    # Parse the response JSON and print the data values
    data = response.json()
    values = data[0]['value'][1:-1].split(';')
    values = [(val.split(":")[1]) for val in values[1:]]
    created_at_str = data[0]['value'][10:10+20]
    
    # Convert the timestamp string to a DateTime object
    tz_vietnam = pytz.timezone('Asia/Ho_Chi_Minh')

    created_at_dt = parser.parse(created_at_str).astimezone(tz_vietnam)

    # Print the DateTime object
    # YYYY-MM-DD hh:mm:ss
    return created_at_dt.strftime('%Y-%m-%d %H:%M:%S'), *values

def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)

def pushVal(client, topic, data):
    # client.on_message = on_message
    client.publish(topic, data)
    client.subscribe(topic)
    
# pushVal(client, CANHBAO_TOPIC, "!5:1#")

# print(getLastRecordReminder())