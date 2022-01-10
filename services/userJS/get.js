import { success, failure } from "../../libs/responseLib";
import {extractIdentityIdFromEvent} from "../../libs/dataExtraction";
import dynamoDb from "../../libs/dynamodb-lib";

export async function handler(event, context) {
  try {
    const params = {
      TableName: process.env.tableName,
        Key: {
          pK: `USER#${event.pathParameters.userId || extractIdentityIdFromEvent(event)}`,
          sK: `USER`
        }
    };
    const userQuery = await dynamoDb.get(params);
    return success(userQuery.Item);
  } catch (e) {
    return failure({
      message: "Error reading user",
      error: e.message
    });
  }
}
