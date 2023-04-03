from controllers.controllers import get_data
from flask import Blueprint, request

routs = Blueprint('routs', __name__)


@routs.route('/')
def on_leak():
    return ""
