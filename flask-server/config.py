import os
import dotenv

dotenv.load_dotenv()

WSGI1_KEY = os.getenv('WSGI1_KEY')
WSGI2_KEY = os.getenv('WSGI2_KEY')