from libs.responseLib import success;
# from libs.dataExtraction import extractUserSubFromEvent;
# import boto3;
# from os import environ;
# dynamodb = boto3.resource('dynamodb', region_name=environ.get('REGION'));
# table = dynamodb.Table(environ.get('tableName'));

def handler(event, context):
    try:
        _event = json.load(event)
    except Exception as e:
        _event = event
    return success({'message': "Not implemented", 'event': _event})
