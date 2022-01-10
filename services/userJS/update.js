import { success, failure } from "../../libs/responseLib";
import { extractIdentityIdFromEvent } from "../../libs/dataExtraction";
import dynamoDb from "../../libs/dynamodb-lib";

export async function handler(event, context) {
  try {
    const data = typeof event.body === typeof "string" ? JSON.parse(event.body):event.body;
    const userId = data.userId || extractIdentityIdFromEvent(event);
    const updateExpression = `SET ${data.userName ? 'userName = :userName,' : ''}\
      ${data.userMail ? ' userMail = :userMail,' : ''}\
      ${data.userPhone ? ' userPhone = :userPhone,' : ''}\
      updatedAt = :updateAt`;
    const expressionAttributeValues = {
      ...(data.userName ? {":userName": data.userName}:{}),
      ...(data.userMail ? {":userMail": data.userMail}:{}),
      ...(data.userPhone ? {":userPhone": data.userPhone}:{}),
      ":updatedAt": Date.now()
    }
    const params = {
      TableName: process.env.tableName,
      Key: {
        pK: `USER#${userId}`,
        sK: 'USER',
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW"
    };
    const updateQuery = await dynamoDb.update(params);
    const userUpdatedAttributes = updateQuery.Attributes;
    return success(userUpdatedAttributes);
  } catch (e) {
    return failure({
      message: "Error updating user",
      error: e.message
    });
  }
}
