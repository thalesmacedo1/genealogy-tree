import request from "supertest"
import server from "../server"
import { connect, close } from './db'

const agent = request.agent(server)

beforeEach(async () => jest.useFakeTimers('legacy'))
beforeAll(async () => await connect())
afterAll(async () => await close())

describe('GET /', () => {
    it('Deve ser capaz de obter uma lista de pessoas', async () => {
        const response = await agent
            .get('/')

        expect(response.body).toStrictEqual([]);
    });
})

describe('GET /person/:id', () => {
    it('Deve ser capaz de obter uma pessoa', async () => {
        const addUser = await agent
            .post('/person')
            .send({ name: "Thales" })

        const response = await agent
            .get(`/person/${addUser.body._id}`)

        expect(response.body._id).toStrictEqual(addUser.body._id);
    })

    it('Dado um id inválido deve retornar erro', async () => {
        const response = await agent
            .get('/person/:id')
            .send({})

        expect(response.body).toStrictEqual({ error: 'id is not a valid person id' })
    })

    it('Dado pessoa não encontrada deve retornar erro', async () => {
        const response = await agent
            .get('/person/629795ce2d2bbec2a0c22620')

        expect(response.body).toStrictEqual({ error: 'person not found' })
    })
})

describe('POST /person', () => {
    it('Deve ser capaz de adicionar uma pessoa', async () => {
        const response = await agent
            .post('/person')
            .send({ name: "Thales" })

        expect(response.body.name).toStrictEqual("Thales")
    })

    it('Dado nome inválido deve retornar erro', async () => {
        const response = await agent
            .post('/person')
            .send({})

        expect(response.body).toStrictEqual({ error: 'field name is required' })
    })
})

describe('PUT /person/:id', () => {
    it('Deve ser capaz de atualizar uma pessoa', async () => {
        const addUser = await agent
            .post('/person')
            .send({ name: "Thales" })

        const response = await agent
            .put(`/person/${addUser.body._id}`)
            .send({ name: "Thales Macedo" })

        expect(response.body.name).toStrictEqual("Thales Macedo")
    })

    it('Dado um id inválido deve retornar erro', async () => {
        const response = await agent
            .put('/person/:id')
            .send({})

        expect(response.body).toStrictEqual({ error: 'id is not a valid person id' })
    })

    it('Dado pessoa não encontrada deve retornar erro', async () => {
        const response = await agent
            .put('/person/629795ce2d2bbec2a0c22620')
            .send({})

        expect(response.body).toStrictEqual({ error: 'person not found' })
    })

})

describe('DELETE /person/:id', () => {
    it('Deve ser capaz de excluir uma pessoa', async () => {
        const addUser = await agent
            .post('/person')
            .send({ name: "Thales" })

        const response = await agent
            .delete(`/person/${addUser.body._id}`)

        expect(response.body._id).toStrictEqual(addUser.body._id);
    })

    it('Dado um id inválido deve retornar erro', async () => {
        const response = await agent
            .delete('/person/:id')
            .send({})

        expect(response.body).toStrictEqual({ error: 'id is not a valid person id' })
    })
    it('Dado pessoa não encontrada deve retornar erro', async () => {
        const response = await agent
            .delete('/person/629795ce2d2bbec2a0c22620')

        expect(response.body).toStrictEqual({ error: 'person not found' })
    })
})

describe('GET /person/tree/:id', () => {
    it('Deve ser capaz de obter a árvore genealógica de uma pessoa', async () => {
        const addUser = await agent
            .post('/person')
            .send({ name: "Thales" })

        const response = await agent
            .get(`/person/tree/${addUser.body._id}`)

        expect(response.body._id).toStrictEqual(addUser.body._id);
    })
    it('Dado um id inválido deve retornar erro', async () => {
        const response = await agent
            .get('/person/tree/:id')
            .send({})

        expect(response.body).toStrictEqual({ error: 'id is not a valid person id' })
    })
    it('Dado pessoa não encontrada deve retornar erro', async () => {
        const response = await agent
            .get('/person/tree/629795ce2d2bbec2a0c22620')
            .send({})

        expect(response.body).toStrictEqual({ error: 'person not found' })
    })
})
