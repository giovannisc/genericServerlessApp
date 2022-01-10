from libs.responseLib import success, failure;
from libs.dataExtraction import extractUserSubFromEvent;
import boto3;
from os import environ;
from datetime import datetime
dynamodb = boto3.resource('dynamodb', region_name=environ.get('REGION'));
table = dynamodb.Table(environ.get('tableName'));
def handler(event, context):
    try:
        _event = json.load(event)
    except Exception as e:
        _event = event
    userId = _event['pathParameters']['userId'] if _event['pathParameters'] and _event['pathParameters']['userId'] else extractUserSubFromEvent(_event)
    try:
        key={
            'pK': f"USER#{userId}",
            'sK': "USER"
        }
        updateExpression = f`SET \
        {'userName = :userName,' if data.userName else ''}\
        {'userMail = :userMail,' if data.userMail else ''}\
        {'userPhone = :userPhone,' if data.userPhone else ''}\
        updatedAt = :updateAt`
        expressionAttributeValues = {
          **({":userName": data.userName} if data.userName else {}),
          **({":userMail": data.userMail} if data.userMail else {}),
          **({":userPhone": data.userPhone} if data.userPhone else {}),
          ":updatedAt": int(datetime.now().timestamp()*1000)
        }
        updateQuery = table.update_item(
            Key=key,
            UpdateExpression=updateExpression,
            ExpressionAttributeValues=expressionAttributeValues,
            ReturnValues="ALL_NEW"
        )
        userUpdatedAttributes = updateQuery['Attributes']
        return success(userUpdatedAttributes);
    except Exception as e:
        return failure({'message': str(e)});
