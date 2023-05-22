import mysql.connector
import time

mydb = mysql.connector.connect(
    host="localhost",
    username="root",
    password="",
    database='dadn'
)

mycursor = mydb.cursor()

def getReport(data = ("2022-01-04 07:55:30", "2024-01-04 07:55:30", 10)):
    command= f'SELECT thoigian, sensor_data1, sensor_data2, sensor_data3, sensor_data4 FROM sensor_data WHERE areas_id = {data[2]} and thoigian BETWEEN "{data[0]}" AND "{data[1]}";'
    mycursor.execute(command)
    rp1 = mycursor.fetchall()
    
    command= f'SELECT thoigian, sensor_data1, sensor_data2, sensor_data3, sensor_data4 FROM sensor_reminder WHERE areas_id = {data[2]} and thoigian BETWEEN "{data[0]}" AND "{data[1]}";'
    mycursor.execute(command)
    rp2 = mycursor.fetchall()
    
    return rp1, rp2
    

print(getReport(("2022-01-04 07:55:30", "2024-01-04 07:55:30", 10)))