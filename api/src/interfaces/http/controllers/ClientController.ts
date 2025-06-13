import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../../application/use-cases/CreateClientUseCase';
import { Client } from '../../../domain/entities/Client';

export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    const client = await this.createClientUseCase.execute(new Client(name, email, phone));
    res.status(201).json(client);
  }
}