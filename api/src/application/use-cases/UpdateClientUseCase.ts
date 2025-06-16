import { Client } from "../../domain/entities/Client";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { publishClientQueue } from "../../infrastructure/messaging/rabbitmq/RabbitMQClient";

export class UpdateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(id: string, updateData: Partial<Client>): Promise<boolean | Client> {

    const client = await this.clientRepository.findById(id);

    if (!client) {
      return false
    }

    const updatedClient = await this.clientRepository.update(id, updateData);

    if (!updatedClient) {
      return false;
    }

    await publishClientQueue({
      type: 'Updated client',
      data: updatedClient
    });
    return updatedClient;
  }
}