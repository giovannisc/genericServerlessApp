import { success, failure } from "../../libs/responseLib";
import {extractIdentityIdFromEvent} from "../../libs/dataExtraction";
import dynamoDb from "../../libs/dynamodb-lib";

export async function handler(event, context) {
  try {
    const data = typeof event.body === typeof "string" ? JSON.parse(event.body):event.body;
    const userId = data.userId || extractIdentityIdFromEvent(event);
    const params = {
      TableName: process.env.tableName,
      Item: {
        pK: `USER#${userId}`,
        sK: "USER",
        userName: data.userName,
        userMail: data.userMail,
        userPhone: data.userPhone,
        updatedAt: null,
        createdAt: Date.now()
      }
    };
    await dynamoDb.put(params);
    return success(params.Item);
  } catch (e) {
    return failure({ message: e.message });
  }
}
