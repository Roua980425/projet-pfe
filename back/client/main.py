from http import client
import os
import shutil
from keras.preprocessing import image
import numpy as np
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from zipfile import ZipFile
from flwr.common.parameter import parameters_to_weights
import mysql.connector as MC
from fastapi.encoders import jsonable_encoder
from datetime import datetime
import json

from urllib.request import Request
# from server import launch_fl_session
import fastapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Request
import shutil



from preprocess_model import vgg_model, load_last_global_model_weights

conn=MC.connect(host='localhost',database='mysql', user='root', password='')

class_type = {0: 'no_tumor', 1: 'tumor'}

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


@app.post("/predictTumour")
async def predict(file: UploadFile = File(...)):
    def get_img_array(img):
        img = image.img_to_array(img) / 255
        img = np.expand_dims(img, axis=0)

        return img

    # img=base64.b64decode(file)
    image_name = 'img.' + str(file.filename).split(".")[-1]
    with open(image_name, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    img = image.load_img(image_name, target_size=(224, 224, 3))
    model = vgg_model()
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    weights = parameters_to_weights(load_last_global_model_weights(f'C:\\Users\\user\\PFE\\pfe1\\pfe1\\back\\server\\fl_sessions')[0])

    model.set_weights(weights)

    img = get_img_array(img)

    res = class_type[np.argmax(model.predict(img))]
    os.remove(image_name)
   # print(res)
    return res


@app.post("/Contribute")
def contribute(file: UploadFile = File(...)):
    with open("file.zip", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    path = "C:\\Users\\user\\PFE\\pfe1\\pfe1\\FL_Dataset2\\test\\"
    with ZipFile('file.zip', 'r') as zipObj:
        # Extract all the contents of zip file in different directory
        zipObj.extractall(path)
        os.remove('file.zip')


@app.get("/selectNotif")
def select_notif():
    cursor = conn.cursor()
    req = 'select center_org.server_name, notification.state, notification.notif_date, client.id from notification, client, center_org where id_client=client.id and id_server=center_org.id and state=0'
    cursor.execute(req)
    notif_list = cursor.fetchall()
    return notif_list

@app.put("/clientAccept")
async def update_state_accept(fastapi_req: Request):
    cursor = conn.cursor()
    body = await fastapi_req.body()
    my_json = body.decode('utf8').replace("'", '"')
    data = json.loads(my_json)
    reqnotif = """UPDATE notification set state = %s where id_client = %s and notif_date = %s"""
    # print(cursor.lastrowid)
    infos = (1, data["client_id"], data["notif_date"])
    cursor.execute(reqnotif, infos)
    conn.commit()
    print('clientid',data["client_id"])
    print('notif date',data["notif_date"])
    os.system('python client.py --id 1 --@ip "localhost" --port 8080 --path "C:\\Users\\user\\PFE\\pfe1\\pfe1\\FL_Dataset2\\')
    return True
    # fl.client.start_numpy_client('127.0.0.1' + ":" + str(8080), client=client)

@app.post("/clientDecline")
async def update_state_decline(fastapi_req: Request):
    cursor = conn.cursor()
    body = await fastapi_req.body()
    my_json = body.decode('utf8').replace("'", '"')
    data = json.loads(my_json)
    reqnotif = """UPDATE notification set state = %s where id_client = %s and notif_date = %s"""
    # print(cursor.lastrowid)
    infos = (2, data["client_id"], data["notif_date"])
    cursor.execute(reqnotif, infos)
    conn.commit()