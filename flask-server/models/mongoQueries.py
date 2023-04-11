import pymongo
from datetime import datetime
from config import MONGO_URI
import redis
import json


def mongo_connect():
    client = pymongo.MongoClient(MONGO_URI)
    db = client["leakDetection"]
    return db["leaks"]


def insert_leak_data(mac):
    coll = mongo_connect()
    last_id = coll.count_documents({})
    data = {
        "_id": last_id + 1,
        "mac": mac,
        "time": str(datetime.now())
    }
    coll.insert_one(data)
    with redis.Redis() as connection:
        connection.lpush("leaks", json.dumps(data))


def get_leak_data(limit):
    coll = mongo_connect()
    data = coll.find({}).sort('_id', -1).limit(limit)
    return list(data)
