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
    await dynamoDb.delete(params);
    return success({message: "User deleted"});
  } catch (e) {
    return failure({
      message: "Error deleting user",
      error: e.message
    });
  }
}
