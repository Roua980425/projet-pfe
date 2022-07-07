from datetime import datetime
import json

from urllib.request import Request
# from server import launch_fl_session
import fastapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Request
import shutil

from server import launch_fl_session
import mysql.connector as MC

conn=MC.connect(host='localhost',database='mysql', user='root', password='')

app = FastAPI()
origins = [
    "*",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

default_ip="localhost"


# num_rounds:parseInt(launch.num_rounds),
# ipaddress:launch.ipaddress,
# port:parseInt(launch.port),
# resume:launch.resume

@app.post("/launchFL")
async  def launch_session(fastapi_req: Request):
       body = await fastapi_req.body()
       my_json = body.decode('utf8').replace("'", '"')
       data = json.loads(my_json)
       print(data["ipaddress"])
       
       cursor=conn.cursor()
       req='select * from client'
       cursor.execute(req)
       clientList=cursor.fetchall()
       print(clientList)
       
       for client in clientList:
           print(client[0])
           reqnotif="""INSERT INTO notification (id_client, id_server, state, notif_date) VALUES (%s,%s,%s,%s)"""
           infos=(client[0],10,0,datetime.now())
           cursor.execute(reqnotif,infos)
           conn.commit()
           


       launch_fl_session(int(data["num_rounds"]),data["ipaddress"],data["port"],data["resume"])
       
       
           

    
