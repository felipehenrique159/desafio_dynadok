import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';
import { CreateClientUseCase } from '../../../application/use-cases/CreateClientUseCase';
import { MongoClientRepository } from '../../../infrastructure/db/mongodb/MongoClientRepository';

const repo = new MongoClientRepository();
const useCase = new CreateClientUseCase(repo);
const controller = new ClientController(useCase);

const clientRouter = Router();
clientRouter.post('/', (req, res) => controller.create(req, res));

export default clientRouter;