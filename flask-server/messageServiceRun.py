from sendingMessages import MessageSender
from config import BOT_TOKEN, EMAIL_PASSWORD

sender = MessageSender(bot_token=BOT_TOKEN, admin_chat_id=-844738317, sender_email="965418723@mail.ru",
                       email_password=EMAIL_PASSWORD, consumer_email="zaharex03@bk.ru")

if __name__ == "__main__":
    sender.start()
