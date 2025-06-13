import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../../application/use-cases/CreateClientUseCase';
import { Client } from '../../../domain/entities/Client';

export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    const client = await this.createClientUseCase.execute(new Client(name, email, phone));
    res.status(201).json(client);
  }
}