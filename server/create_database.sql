DROP DATABASE dadn;
CREATE DATABASE dadn;
USE dadn;

CREATE TABLE areas(
    areas_id int PRIMARY KEY,
    sensor_id1 int,
    sensor_id2 int,
    sensor_id3 int,
    sensor_id4 int,
    device_id1 int NULL,
    device_id2 int NULL,
    device_id3 int NULL
);

CREATE TABLE accounts(
	username varchar(20),
    areas_id int,
    PRIMARY KEY     (username, areas_id),
    FOREIGN KEY (areas_id) REFERENCES areas(areas_id)
);

CREATE TABLE sensor_data(
    thoigian DATETIME PRIMARY KEY,
    sensor_data1 float,
    sensor_data2 float,
    sensor_data3 float,
    sensor_data4 float,
    areas_id int, 
    FOREIGN KEY (areas_id) REFERENCES areas(areas_id)

);

CREATE TABLE sensor_reminder(
    thoigian DATETIME PRIMARY KEY,
    sensor_data1 float NULL,
    sensor_data2 float NULL,
    sensor_data3 float NULL,
    sensor_data4 float NULL,
    areas_id int, 
    FOREIGN KEY (areas_id) REFERENCES areas(areas_id)

);
CREATE TABLE reports (
    report_id INT PRIMARY KEY,
    report_type VARCHAR(50),
    areas_id int, 
    FOREIGN KEY (areas_id) REFERENCES areas(areas_id),
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO areas (areas_id, sensor_id1, sensor_id2, sensor_id3, sensor_id4) VALUES (10,0,1,2,3);
INSERT INTO accounts (username, areas_id) VALUES ("testdadn",10);