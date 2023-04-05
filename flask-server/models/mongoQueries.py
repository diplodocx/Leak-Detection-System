import pymongo
from datetime import datetime


def mongo_connect():
    client = pymongo.MongoClient("mongodb+srv://diplodocx:work11@cluster0.9t5khye.mongodb.net/?retryWrites=true&w=majority")
    db = client["leakDetection"]
    return db["leaks"]


def insert_leak_data(mac):
    coll = mongo_connect()
    last_id = coll.count_documents({})
    data = {
        "_id": last_id + 1,
        "mac": mac,
        "time": datetime.now()
    }
    coll.insert_one(data)


def get_leak_data(limit):
    coll = mongo_connect()
    data = coll.find({}).sort('_id', -1).limit(limit)
    return list(data)
