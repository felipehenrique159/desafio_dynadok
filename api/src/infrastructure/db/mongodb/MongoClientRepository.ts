import { IClientRepository } from '../../../domain/repositories/IClientRepository';
import { ClientModel } from './ClientModel';
import { Client } from '../../../domain/entities/Client';

export class MongoClientRepository implements IClientRepository {
  async create(data: Client): Promise<Client> {
  const created = await ClientModel.create(data);
  const obj = created.toObject();
  const client = new Client(obj.name ?? '', obj.email ?? '', obj.phone ?? '');
  client.id = obj._id?.toString();
  client.createdAt = obj.createdAt;
  client.updatedAt = obj.updatedAt;
  return client;
}

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const updated = await ClientModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return null;
    const obj = updated.toObject();
    return new Client(obj.name ?? '', obj.email ?? '', obj.phone ?? '');
  }

  async findById(id: string): Promise<Client | null> {
    const found = await ClientModel.findById(id);
    if (!found) return null;
    const obj = found.toObject();
    return new Client(obj.name ?? '', obj.email ?? '', obj.phone ?? '');
  }

  async findAll(): Promise<Client[]> {
    const list = await ClientModel.find();
    return list.map(doc => {
      const obj = doc.toObject();
      return new Client(obj.name ?? '', obj.email ?? '', obj.phone ?? '', obj._id?.toString());
    });
  }

  async delete(id: string): Promise<Client | null> {
    const deleted = await ClientModel.findByIdAndDelete(id);
    if (!deleted) return null;
    const obj = deleted.toObject();
    return new Client(obj.name ?? '', obj.email ?? '', obj.phone ?? '');
  }
}