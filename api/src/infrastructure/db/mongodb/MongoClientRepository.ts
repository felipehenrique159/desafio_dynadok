import { IClientRepository } from '../../../domain/repositories/IClientRepository';
import { ClientModel } from './ClientModel';
import { Client } from '../../../domain/entities/Client';

export class MongoClientRepository implements IClientRepository {
  async create(data: Client): Promise<Client> {
    const created = await ClientModel.create(data);
    const obj = created.toObject();
    return new Client(obj.name ?? '', obj.email ?? '', obj.phone ?? '');
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
      return new Client(obj.name ?? '', obj.email ?? '', obj.phone ?? '');
    });
  }
}