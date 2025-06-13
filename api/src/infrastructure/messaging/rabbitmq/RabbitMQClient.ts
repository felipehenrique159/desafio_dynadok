import amqp from 'amqplib';

export const publishClientQueue = async (data: any) => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL || '');
  const ch = await conn.createChannel();
  await ch.assertQueue('clients');
  ch.sendToQueue('clients', Buffer.from(JSON.stringify(data)));
  await ch.close();
  await conn.close();
};