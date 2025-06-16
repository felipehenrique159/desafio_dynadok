import { Client } from "../../domain/entities/Client";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { publishClientQueue } from "../../infrastructure/messaging/rabbitmq/RabbitMQClient";

export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepository) { }

  async execute(clientId: string): Promise<Client | null> {
    const deletedClient = await this.clientRepository.delete(clientId);
    if (deletedClient) {
      await publishClientQueue({
        type: 'Deleted client',
        data: deletedClient
      });
    }
    return deletedClient;
  }
}