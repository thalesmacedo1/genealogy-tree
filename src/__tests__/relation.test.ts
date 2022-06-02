import request from "supertest"
import server from "../server"
import { connect, close } from './db'

const agent = request.agent(server)

beforeAll(async () => await connect())
afterAll(async () => await close())

describe('POST /person/relation/:children/:parent', () => {
  it('Deve ser capaz de criar uma relação', async () => {
    const addUser1 = await agent
      .post('/person')
      .send({ name: "Thales" })

    const addUser2 = await agent
      .post('/person')
      .send({ name: "Sandra" })

    await agent
      .post(`/person/relation/${addUser1.body._id}/${addUser2.body._id}`)
      .expect(200)
  })

  it('Dado um id inválido deve retornar erro', async () => {
    const response = await agent
      .post('/person/relation/12345/54321')

    expect(response.body).toStrictEqual({ error: 'id is not a valid person id' })
  })

  it('Dado um parent e um children iguais deve retornar erro', async () => {

    const response = await agent
      .post('/person/relation/629795ce2d2bbec2a0c22620/629795ce2d2bbec2a0c22620')

    expect(response.body).toStrictEqual({ error: 'parent and child cannot be the same person' })
  })

  it('Dado child não encontrada deve retornar erro', async () => {
    const addUser = await agent
      .post('/person')
      .send({ name: "Thales" })

    const response = await agent
      .post(`/person/relation/629795ce2d2bbec2a0c22620/${addUser.body._id}`)

    expect(response.body).toStrictEqual({ error: 'child not found' })
  })

  it('Dado parent não encontrado deve retornar erro', async () => {
    const addUser = await agent
      .post('/person')
      .send({ name: "Thales" })

    const response = await agent
      .delete(`/person/relation/${addUser.body._id}/629795ce2d2bbec2a0c22620`)

    expect(response.body).toStrictEqual({ error: 'parent not found' })
  })

  it('Dada uma pessoa que já é parent da child deve retornar erro', async () => {
    const addUser1 = await agent
      .post('/person')
      .send({ name: "Thales" })

    const addUser2 = await agent
      .post('/person')
      .send({ name: "Darlan" })

    await agent
      .post(`/person/relation/${addUser1.body._id}/${addUser2.body._id}`)

    const response = await agent
      .post(`/person/relation/${addUser1.body._id}/${addUser2.body._id}`)

    expect(response.body).toStrictEqual({ error: 'the person is already parent of the target child' })
  })

  it('Dado um child que faz parte da árvore de ascendentes da child deve retornar erro', async () => {
    const addUser1 = await agent
      .post('/person')
      .send({ name: "Thales" })

    const addUser2 = await agent
      .post('/person')
      .send({ name: "Darlan" })

    const addUser3 = await agent
      .post('/person')
      .send({ name: "Sandra" })

    const addUser4 = await agent
      .post('/person')
      .send({ name: "Antônio" })

    await agent
      .post(`/person/relation/${addUser1.body._id}/${addUser2.body._id}`)

    await agent
      .post(`/person/relation/${addUser1.body._id}/${addUser3.body._id}`)

    const response = await agent
      .post(`/person/relation/${addUser3.body._id}/${addUser1.body._id}`)

    expect(response.body).toStrictEqual({ error: 'a person cannot be father of its ascendants' })
  })

  it('Dado um child que já tem dois parents deve retornar erro', async () => {
    const addUser1 = await agent
      .post('/person')
      .send({ name: "Thales" })

    const addUser2 = await agent
      .post('/person')
      .send({ name: "Darlan" })

    const addUser3 = await agent
      .post('/person')
      .send({ name: "Sandra" })

    const addUser4 = await agent
      .post('/person')
      .send({ name: "Antônio" })

    await agent
      .post(`/person/relation/${addUser1.body._id}/${addUser2.body._id}`)

    await agent
      .post(`/person/relation/${addUser1.body._id}/${addUser3.body._id}`)

    const response = await agent
      .post(`/person/relation/${addUser1.body._id}/${addUser4.body._id}`)

    expect(response.body).toStrictEqual({ error: 'a person cannot have more than two parents' })
  })
})

describe('DELETE /person/relation/:children/:parent', () => {
  it('Deve ser capaz de excluir uma relação', async () => {
    const addUser1 = await agent
      .post('/person')
      .send({ name: "Thales" })

    const addUser2 = await agent
      .post('/person')
      .send({ name: "Sandra" })

    await agent
      .post(`/person/relation/${addUser1.body._id}/${addUser2.body._id}`)

    await agent
      .delete(`/person/relation/${addUser1.body._id}/${addUser2.body._id}`)
      .expect(200)
  })

  it('Dado um id inválido deve retornar erro', async () => {
    const response = await agent
      .delete('/person/relation/12345/54321')

    expect(response.body).toStrictEqual({ error: 'id is not a valid person id' })
  })

  it('Dado um parent e um children iguais deve retornar erro', async () => {
    const response = await agent
      .delete('/person/relation/629795ce2d2bbec2a0c22620/629795ce2d2bbec2a0c22620')

    expect(response.body).toStrictEqual({ error: 'parent and child cannot be the same person' })
  })

  it('Dado child não encontrada deve retornar erro', async () => {
    const addUser = await agent
      .post('/person')
      .send({ name: "Thales" })

    const response = await agent
      .delete(`/person/relation/629795ce2d2bbec2a0c22620/${addUser.body._id}`)

    expect(response.body).toStrictEqual({ error: 'child not found' })
  })

  it('Dado parent não encontrado deve retornar erro', async () => {
    const addUser = await agent
      .post('/person')
      .send({ name: "Thales" })

    const response = await agent
      .delete(`/person/relation/${addUser.body._id}/629795ce2d2bbec2a0c22620`)

    expect(response.body).toStrictEqual({ error: 'parent not found' })
  })
})