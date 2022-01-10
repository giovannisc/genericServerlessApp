import json
from dotenv import load_dotenv
load_dotenv()
from services.usersPy.create import handler as create
from services.usersPy.get import handler as get
from services.usersPy.list import handler as list
from services.usersPy.update import handler as update
from services.usersPy.delete import handler as delete
from datetime import datetime;

def test_handler():
    with open('./services/usersPy/events/create-user.json') as event:
        response = create(event, {})
        assert response['statusCode'] == 200
    with open('./services/usersPy/events/get-user.json') as event:
        response = get(event, {})
        assert response['statusCode'] == 200
    with open('./services/usersPy/events/list-user.json') as event:
        response = list(event, {})
        assert response['statusCode'] == 200
    with open('./services/usersPy/events/update-user.json') as event:
        response = update(event, {})
        assert response['statusCode'] == 200
    with open('./services/usersPy/events/delete-user.json') as event:
        response = delete(event, {})
        assert response['statusCode'] == 200
