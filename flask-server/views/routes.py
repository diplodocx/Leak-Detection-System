from flask import Blueprint, jsonify
from controllers.controllers import get_data

routes = Blueprint('routs', __name__)


@routes.route('/')
def on_leak():
    data = get_data(limit=100)
    return jsonify({
        "tittle":"webpage",
        "leak_data":data
    })
