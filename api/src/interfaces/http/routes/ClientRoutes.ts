import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';
import { CreateClientUseCase } from '../../../application/use-cases/CreateClientUseCase';
import { MongoClientRepository } from '../../../infrastructure/db/mongodb/MongoClientRepository';
import { UpdateClientUseCase } from '../../../application/use-cases/UpdateClientUseCase';
import { GetClientUseCase } from '../../../application/use-cases/GetClientUseCase';
import { DeleteClientUseCase } from '../../../application/use-cases/DeleteClientUseCase';
import { GetAllClientsUseCase } from '../../../application/use-cases/GetAllClientsUseCase';

const repo = new MongoClientRepository();
// const useCase = new CreateClientUseCase(repo);
// const controller = new ClientController(useCase);
const createUseCase = new CreateClientUseCase(repo);
const updateUseCase = new UpdateClientUseCase(repo);
const getUseCase = new GetClientUseCase(repo);
const deleteUseCase = new DeleteClientUseCase(repo);
const getAllUseCase = new GetAllClientsUseCase(repo);

const controller = new ClientController(
  createUseCase,
  updateUseCase,
  getUseCase,
  deleteUseCase,
  getAllUseCase
);

const clientRouter = Router();
clientRouter.post('/', (req, res) => controller.create(req, res));
clientRouter.put('/:id', (req, res) => controller.update(req, res));
clientRouter.get('/:id', (req, res) => controller.getById(req, res));
clientRouter.delete('/:id', (req, res) => controller.delete(req, res));
clientRouter.get('/', async (req, res) => controller.getAll(req, res));

export default clientRouter;