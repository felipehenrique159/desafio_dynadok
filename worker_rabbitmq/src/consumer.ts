import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq';

async function connectWithRetry(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await amqp.connect(RABBITMQ_URL);
      return conn;
    } catch (err) {
      console.log(`RabbitMQ not ready, retrying in ${delay / 1000}s... (${i + 1}/${retries})`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('Could not connect to RabbitMQ after several attempts.');
}

export const startConsumer = async () => {
  const conn = await connectWithRetry();
  const ch = await conn.createChannel();
  await ch.assertQueue('clients');
  ch.consume('clients', async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('Received message:', data);
      ch.ack(msg);
    }
  });
  console.log('Worker RabbitMQ: waiting for messages in the "clients" queue...');
};