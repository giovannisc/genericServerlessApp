import { successList, failure } from "../../libs/responseLib";
import {extractIdentityIdFromEvent} from "../../libs/dataExtraction";
import dynamoDb from "../../libs/dynamodb-lib";

export async function handler(event, context) {
  try {
    let usersQuery={};
    for(let i = 0; i <= parseInt(event.queryStringParameters.page||0); i++){//this is a trick to read more pages, because dynamodb only allows 1MB read
      let params = {
        TableName: process.env.tableName,
        IndexName: 'sKpK',
        ExpressionAttributeNames: {
          "#pK": "pK",
          "#sK": "sK",
          ...(!event.queryStringParameters.userSearch?{}:{"#userSearch": "userSearch"})
        },
        ExpressionAttributeValues: {
          ':sK': "USER",
          ':pK': "USER#",
          ...(!event.queryStringParameters.userSearch?{}:{":userSearch": event.queryStringParameters.userSearch})
        },
        KeyConditionExpression: '#sK = :sK AND begins_with(#pK,:pK)',
        Limit: parseInt(event.queryStringParameters.pageSize) || 1,
        ExclusiveStartKey: usersQuery.LastEvaluatedKey || null,
        ...(!event.queryStringParameters.companyName?{}:{FilterExpression: "contains(#userSearch, :userSearch)"})
      };
      usersQuery = await dynamoDb.query(params);
    };
    const users = usersQuery.Items;// users read
    const usersCount = usersQuery.Count;// count of users read
    const usersScannedCount = usersQuery.ScannedCount;// count of all users
    return successList(users, usersCount, usersScannedCount);
  } catch (e) {
    return failure({
      message: "Error listing users",
      error: e.message
    });
  }
}
