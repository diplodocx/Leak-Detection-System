from flask import Blueprint, jsonify, request
from controllers.controllers import get_data, login_user

routes = Blueprint('routs', __name__)


@routes.route('/leaks')
def leaks():
    data = get_data(limit=100)
    return jsonify({
        "leak_data": data
    })


@routes.route('/login', methods=['POST'])
def on_login():
    data = request.json
    res = login_user(data)
    return jsonify(res)
