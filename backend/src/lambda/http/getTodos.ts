import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS  from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

const todosTable = process.env.TODOS_TABLE
//const userIndex = process.env.USER_ID_INDEX


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  // TODO: Get all TODO items for a current user
 // const userId = event.pathParameters.userId

 // const result = await docClient.query({
     // TableName : todosTable,
     // IndexName : userIndex,
    //  KeyConditionExpression: 'userId = :userId',
    //  ExpressionAttributeValues: {
         // ':userId': userId
     // }
 // }).promise()
 
const result = await docClient.scan({
    TableName: todosTable
  }).promise();
  
 // if (result.Count !== 0) {
   // return {
   //   statusCode: 200,
    //  headers: {
     //   'Access-Control-Allow-Origin': '*'
    //  },
    //  body: JSON.stringify(result.Items)
  //  }
 // }

  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      result
    })
  }
}
