import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';
import { CreateClientUseCase } from '../../../application/use-cases/CreateClientUseCase';
import { MongoClientRepository } from '../../../infrastructure/db/mongodb/MongoClientRepository';
import { UpdateClientUseCase } from '../../../application/use-cases/UpdateClientUseCase';
import { GetClientUseCase } from '../../../application/use-cases/GetClientUseCase';
import { DeleteClientUseCase } from '../../../application/use-cases/DeleteClientUseCase';
import { GetAllClientsUseCase } from '../../../application/use-cases/GetAllClientsUseCase';

const repo = new MongoClientRepository();
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

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Operações relacionadas a clientes
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
clientRouter.post('/', (req, res) => controller.create(req, res));

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
clientRouter.put('/:id', (req, res) => controller.update(req, res));

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Busca um cliente pelo ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 */
clientRouter.get('/:id', (req, res) => controller.getById(req, res));

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Remove um cliente pelo ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       204:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
clientRouter.delete('/:id', (req, res) => controller.delete(req, res));

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
clientRouter.get('/', async (req, res) => controller.getAll(req, res));

export default clientRouter;