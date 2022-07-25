import express from 'express';
import ClientsController from './controllers/cliente.controller';
import PetsController from './controllers/pets.controller';

const routes = express.Router();
const clientController = new ClientsController();
const petsController = new PetsController();

routes
  // Rotas de Pets
  .post('/pets', petsController.create)
  .get('/pets', petsController.getAll)
  .get("/pets/tutor/:id", petsController.getByTutor)
  .get('/pets/:id', petsController.getOne)
  .put('/pets/:id', petsController.update)
  .delete('/pets/:id', petsController.delete)

  // Rotas de Clientes
  .post('/clients', clientController.create)
  .get('/clients', clientController.getAll)
  .get('/clients/:id', clientController.getOne)
  .put('/clients/:id', clientController.update)
  .delete('/clients/:id', clientController.delete);

export default routes;
