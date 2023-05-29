const AWS = require("aws-sdk");

class MessageService {
  constructor() {
    this.dynamodb = new AWS.DynamoDB.DocumentClient();
  }
  async createMessage(message) {
    try {
      const params = {
        TableName: process.env.DYNAMODB_MESSAGE_TABLE,
        Item: {
          primary_key: message,
          createdAt: new Date().toISOString(),
        },
      };
      await this.dynamodb.put(params).promise();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getMessages() {
    try {
      const params = {
        TableName: process.env.DYNAMODB_MESSAGE_TABLE,
      };
      const result = await this.dynamodb.scan(params).promise();

      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = MessageService;
