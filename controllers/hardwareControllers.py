from models.mongoQueries import insert_leak_data


def insert_hardware_data(mac):
    insert_leak_data(mac)
