import mysql.connector
import mAdaServer
import time

mydb = mysql.connector.connect(
    host="localhost",
    username="root",
    password="",
    database='dadn'
)

mycursor = mydb.cursor()

def addLastRecord(data):
    command="insert into sensor_data (thoigian, sensor_data1, sensor_data2, sensor_data3, sensor_data4, areas_id) values (%s, %s, %s, %s, %s, 10);"
    mycursor.execute(command, data)
    mydb.commit()

def getLastRecord():
    command="select * from sensor_data order by thoigian desc limit 1;"
    mycursor.execute(command)
    return mycursor.fetchall()

def addLastRecordReminder(data):
    command="insert into sensor_reminder (thoigian, sensor_data1, sensor_data2, sensor_data3, sensor_data4, areas_id) values (%s, %s, %s, %s, %s, 10);"
    mycursor.execute(command, data)
    mydb.commit()

def getLastRecordReminder():
    command="select * from sensor_reminder order by thoigian desc limit 1;"
    mycursor.execute(command)
    return mycursor.fetchall()

def updateRecord():
    values = mAdaServer.getLastRecord()
    lre = getLastRecord()
    timeCheck = lre[0] if lre else ' '
    if str(timeCheck[0]) == values[0]:
        print("Not Update")
    else:
        addLastRecord(values)
        mAdaServer.client.loop_start()
        mAdaServer.pushVal(mAdaServer.client, mAdaServer.TEMP_TOPIC, values[1])
        mAdaServer.pushVal(mAdaServer.client, mAdaServer.HUM_A_TOPIC, values[2])
        mAdaServer.pushVal(mAdaServer.client, mAdaServer.HUM_B_TOPIC, values[3])
        mAdaServer.pushVal(mAdaServer.client, mAdaServer.LUX_TOPIC, values[4])
        time.sleep(4) # wait
        mAdaServer.client.loop_stop()
        print("Updated")
        
def updateRecordReminder():
    values = mAdaServer.getLastRecordReminder()
    # print(values)
    lre = getLastRecordReminder()
    timeCheck = lre[0] if lre else ' '
    if str(timeCheck[0]) == values[0]:
        print("Not Update Reminder")
    else:
        addLastRecordReminder(values)
        print("Updated Reminder")
      
num = 20
while num: 
    t = time.localtime()
    current_time = time.strftime("%H:%M:%S", t)
    print(current_time)

    updateRecord()
    updateRecordReminder()
    time.sleep(10)
    num -= 1