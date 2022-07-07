import mysql.connector as MC
from datetime import datetime


try:
    conn = MC.connect(host='localhost', database='mysql', user='root', password='')
    cursor = conn.cursor()
    datee = datetime.now()
    req = """INSERT INTO notification (id, id_client, id_server, state, notif_date) VALUES (%s,%s,%s,%s,%s)"""
    infos = (1, 1, 10, 0, datee)
    cursor.execute(req, infos)
    conn.commit()
    # clientlist = cursor.fetchall()
    #
    # # for client in clientlist:
    # #     print(client[0])
except MC.Error as err:
    print(err)
finally:
    if conn.is_connected():
        cursor.close()
        conn.close()