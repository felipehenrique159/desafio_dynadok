import { Client } from "../../domain/entities/Client";
import { IClientRepository } from "../../domain/repositories/IClientRepository";

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(client: Client): Promise<Client> {
    return this.clientRepository.create(client);
  }
}