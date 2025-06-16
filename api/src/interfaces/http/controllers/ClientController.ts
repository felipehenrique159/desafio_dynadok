import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../../application/use-cases/CreateClientUseCase';
import { Client } from '../../../domain/entities/Client';
import { UpdateClientUseCase } from '../../../application/use-cases/UpdateClientUseCase';
import { GetClientUseCase } from '../../../application/use-cases/GetClientUseCase';
import { DeleteClientUseCase } from '../../../application/use-cases/DeleteClientUseCase';
import { GetAllClientsUseCase } from '../../../application/use-cases/GetAllClientsUseCase';

export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private updateClientUseCase?: UpdateClientUseCase,
    private getClientUseCase?: GetClientUseCase,
    private deleteClientUseCase?: DeleteClientUseCase,
    private getAllClientUseCase?: GetAllClientsUseCase
  ) { }

  async create(req: Request, res: Response) {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    const client = await this.createClientUseCase.execute(new Client(name, email, phone));
    res.status(201).json(client);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      return res.status(400).json({ error: 'At least one field (name, email, phone) is required.' });
    }
    if (!this.updateClientUseCase) {
      return res.status(500).json({ error: 'Update use case not implemented.' });
    }
    const updated = await this.updateClientUseCase.execute(id, { name, email, phone });
    if (!updated) return res.status(404).json({ error: 'Client not found.' });
    res.json(updated);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!this.getClientUseCase) {
      return res.status(500).json({ error: 'Get use case not implemented.' });
    }
    const client = await this.getClientUseCase.execute(id);
    if (!client) return res.status(404).json({ error: 'Client not found.' });
    res.json(client);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!this.deleteClientUseCase) {
      return res.status(500).json({ error: 'Delete use case not implemented.' });
    }
    const deleted = await this.deleteClientUseCase.execute(id);
    if (!deleted) return res.status(404).json({ error: 'Client not found.' });
    res.status(204).send();
  }

  async getAll(req: Request, res: Response) {
    if (!this.getAllClientUseCase) {
      return res.status(500).json({ error: 'Get all use case not implemented.' });
    }
    const clients = await this.getAllClientUseCase.execute();
    res.json(clients);
  }
}