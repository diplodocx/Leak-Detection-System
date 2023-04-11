from models.mongoQueries import get_leak_data
from models.checkPassword import check_pass


def get_data(limit):
    return get_leak_data(limit)


def login_user(data):
    return check_pass(data)
