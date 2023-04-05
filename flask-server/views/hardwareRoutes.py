from controllers.hardwareControllers import insert_hardware_data
from flask import Blueprint, request

hardware_routs = Blueprint('hardware_routs', __name__)


@hardware_routs.route('/')
def on_leak():
    mac = request.args.get('mac')
    insert_hardware_data(mac)
    return ""
