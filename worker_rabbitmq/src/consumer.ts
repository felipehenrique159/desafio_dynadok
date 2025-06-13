import amqp from 'amqplib';
import { handleClientCreated } from './handlers/clientCreatedHandler';

export const startConsumer = async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
  const ch = await conn.createChannel();
  await ch.assertQueue('clients');
  ch.consume('clients', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      await handleClientCreated(data);
      ch.ack(msg);
    }
  });
  console.log('Worker RabbitMQ: aguardando mensagens na fila "clients"...');
};