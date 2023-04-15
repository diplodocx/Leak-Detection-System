from config import SYS_PASS


def check_pass(data):
    password = data["password"]
    return {"isPCorrect": password == SYS_PASS}
