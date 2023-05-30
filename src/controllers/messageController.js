const MessageService = require("../services/messageService");

const createMessage = async (event) => {

  const data = event.rmqMessagesByQueue["prueba::/"][0].data;
  const buff = Buffer.from(data, 'base64');
  const message = buff.toString('ascii');

  const messageService = new MessageService();

  const isCreated = await messageService.createMessage(message);

  if(isCreated) {
    console.log("Mensajes guardados en DynamoDB exitosamente.");
    return {
      statusCode: 200,
      body: "Mensajes guardados en DynamoDB exitosamente.",
    };
  }else{
    return {
      statusCode: 500,
      body: "Error al guardar los mensajes en DynamoDB.",
    };
  }
};

const createMessageExpress = async (req, res) => {
  const { message } = req.body;
  const messageService = new MessageService();

  const isCreated = await messageService.createMessage(message);

  if (isCreated) {
    return res.status(200).json({
      message: "Mensaje guardado exitosamente.",
    });
  } else {
    return res.status(500).json({
      message: "Error al guardar el mensaje.",
    });
  }
};

const getMessages = async (req, res) => {
  const messageService = new MessageService();
  const messages = await messageService.getMessages();

  return res.status(200).json({
    count: messages.Count,
    data: messages.Items.map((message) => {
      return {
        message: message.primary_key,
        createdAt: message.createdAt,
      };
    }),
  });
};

module.exports = {
  createMessage,
  createMessageExpress,
  getMessages,
};
