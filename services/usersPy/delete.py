from libs.responseLib import success, failure;
from libs.dataExtraction import extractUserSubFromEvent;
import boto3;
from os import environ;
dynamodb = boto3.resource('dynamodb', region_name=environ.get('REGION'));
table = dynamodb.Table(environ.get('tableName'));

def handler(event, context):
    try:
        _event = json.load(event)
    except Exception as e:
        _event = event
    userId = _event['pathParameters']['userId'] if _event['pathParameters'] and _event['pathParameters']['userId'] else extractUserSubFromEvent(_event)
    try:
        key = {
            'pK': f"USER#{userId}",
            'sK': "USER"
        }
        table.delete_item(
            Key=key
        )
        return success({'message': "User deleted"});
    except Exception as e:
        return failure({'message': str(e)});
