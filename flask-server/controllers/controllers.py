from models.mongoQueries import get_leak_data


def get_data(limit):
    return get_leak_data(limit)
