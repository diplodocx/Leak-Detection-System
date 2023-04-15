from config import SYS_USERNAME

def check_username(data):
    username = data['username']
    return {"isUCorrect": username == SYS_USERNAME}