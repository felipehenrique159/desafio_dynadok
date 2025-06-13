import { Client } from "../../domain/entities/Client";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { publishClientQueue } from "../../infrastructure/messaging/rabbitmq/RabbitMQClient";

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(client: Client): Promise<Client> {
    const data = await this.clientRepository.create(client);
    await publishClientQueue({
      'type': 'created',
      'data': data
    });
    return data;
  }
}