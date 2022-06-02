import { Router } from 'express';

import personController from '../controllers/person';
import relationController from '../controllers/relation';

const PersonController = new personController();
const RelationController = new relationController();

const routes = Router();

routes.get('/', PersonController.ListPersons); // Obter lista de pessoas
routes.get('/person/:id', PersonController.GetPerson); // Obter pessoa
routes.post('/person/', PersonController.AddNewPerson); // Adicionar pessoa
routes.put('/person/:id', PersonController.UpdatePerson); // Atualizar pessoa
routes.delete('/person/:id', PersonController.DeletePerson); // Excluir pessoa

routes.post('/person/relation/:children/:parent', RelationController.AddNewRelation); // Adicionar relação
routes.delete('/person/relation/:children/:parent', RelationController.DeleteRelation); // Excluir relação

routes.get('/person/tree/:id', PersonController.GetGenealogy); // Obter árvore geneológica

export default routes;
