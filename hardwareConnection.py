from flask import Flask
from views.hardwareRoutes import hardware_routs

app = Flask(__name__)
app.secret_key = "214454223"
app.register_blueprint(hardware_routs)

if __name__ == "__main__":
    app.run()

