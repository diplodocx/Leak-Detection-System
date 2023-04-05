from flask import Flask
from views.hardwareRoutes import hardware_routs
from config import WSGI2_KEY

app = Flask(__name__)
app.secret_key = WSGI2_KEY
app.register_blueprint(hardware_routs)

if __name__ == "__main__":
    app.run(port=5001, debug=True)

