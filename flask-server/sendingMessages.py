import redis
from telebot import TeleBot
from config import BOT_TOKEN, ADMIN_CHAT_ID
import json
from datetime import datetime


class MessageSender:
    def __init__(self, bot_token, admin_chat_id):
        self.bot = TeleBot(bot_token)
        self.admin_chat_id = admin_chat_id

    def start(self):
        with redis.Redis() as connection:
            while True:
                leak_data = json.loads(connection.brpop("leaks")[1])
                self._send_telegram(leak_data)

    def _send_telegram(self, data):
        text_arr = list()
        text_arr.append("Leak detected")
        text_arr.append(f'mac address: {data["mac"]}')
        text_arr.append(f'leak time: {MessageSender._format_time(data["time"])}')
        text = "\n".join(text_arr)
        self.bot.send_message(self.admin_chat_id, text)

    @staticmethod
    def _format_time(time_str):
        old_format = "%Y-%m-%d %H:%M:%S.%f"
        dt = datetime.strptime(time_str, old_format)
        new_format = "%d.%m.%Y, %H:%M"
        str = datetime.strftime(dt, new_format)
        return str


ms = MessageSender(BOT_TOKEN, ADMIN_CHAT_ID)
ms.start()
