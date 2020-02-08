import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import * as AWS  from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

const todosTable = process.env.TODOS_TABLE


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const newUpdatedTodo = await docClient.update({
        TableName: todosTable,
        Key: { todoId },
        UpdateExpression: 'set todoName = :name, dueDate = :date, done = :done',
        ExpressionAttributeValues: {
          ':name':updatedTodo.name,
          ':date':updatedTodo.dueDate,
          ':done':updatedTodo.done
        },
        ReturnValues: "UPDATED_TODO"
      }).promise();

   return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
     newUpdatedTodo
    })
  }

}
