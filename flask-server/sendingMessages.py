import redis
from telebot import TeleBot
import json
from datetime import datetime
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class MessageSender:
    def __init__(self, bot_token=None, admin_chat_id=None, sender_email=None, consumer_email=None, email_password=None):
        if bot_token:
            self.bot = TeleBot(bot_token)
        else:
            self.bot = None
        self.admin_chat_id = admin_chat_id
        self.consumer = consumer_email
        self.sender = sender_email
        self.password = email_password

    def start(self):
        with redis.Redis() as connection:
            while True:
                leak_data = json.loads(connection.brpop("leaks")[1])
                if self.bot:
                    self._send_telegram(leak_data)
                if self.sender:
                    self._send_email(leak_data)

    @staticmethod
    def _make_message_body(data):
        text_arr = list()
        text_arr.append("Leak detected")
        text_arr.append(f'mac address: {data["mac"]}')
        text_arr.append(f'leak time: {MessageSender._format_time(data["time"])}')
        return "\n".join(text_arr)

    def _send_telegram(self, data):
        text = MessageSender._make_message_body(data)
        self.bot.send_message(self.admin_chat_id, text)

    @staticmethod
    def _format_time(time_str):
        old_format = "%Y-%m-%d %H:%M:%S.%f"
        dt = datetime.strptime(time_str, old_format)
        new_format = "%d.%m.%Y, %H:%M"
        str = datetime.strftime(dt, new_format)
        return str

    def _send_email(self, data):
        text = MessageSender._make_message_body(data)
        msg = MIMEMultipart()
        msg['From'] = self.sender
        msg['To'] = self.consumer
        msg['Subject'] = "Leak detected"
        msg.attach(
            MIMEText(text, 'plain')
        )
        server = smtplib.SMTP("smtp.mail.ru", 587)
        server.starttls()
        server.login(self.sender, self.password)
        server.send_message(msg)

