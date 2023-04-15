from models.mongoQueries import get_leak_data
from models.checkPassword import check_pass
from models.checkUsername import check_username


def get_data(limit):
    return get_leak_data(limit)


def login_user(data):
    return {'checkP': check_pass(data), 'checkU': check_username(data)}
