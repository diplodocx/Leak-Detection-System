from flask import Flask
from config import WSGI2_KEY
from views.routes import routes

app = Flask(__name__)
app.secret_key = WSGI2_KEY
app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(debug=True)
