import { Client } from "../../domain/entities/Client";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { publishClientQueue } from "../../infrastructure/messaging/rabbitmq/RabbitMQClient";
import { cacheClient } from "../../infrastructure/cache/redis/RedisClient";

export class GetClientUseCase {
    constructor(private clientRepository: IClientRepository) {}

     async execute(clientId: string): Promise<Client | null> {
        let client = await cacheClient.get(clientId);
        if (!client) {
            client = await this.clientRepository.findById(clientId);
            if (client) {
                await cacheClient.set(clientId, client);
            }
        }
        if (client) {
            await publishClientQueue({
                type: 'Fetched client',
                data: client
            });
        }
        return client;
    }
}