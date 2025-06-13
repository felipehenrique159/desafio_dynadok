export const handleClientCreated = async (data: any) => {
  console.log('Mensagem recebida do RabbitMQ (novo cliente):', data);
};