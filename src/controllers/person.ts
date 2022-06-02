import { Request, Response } from 'express'
import personModel from "../models/person"

const PersonModel = new personModel();

export default class PersonController {
	async ListPersons(req: Request, res: Response) {

		const { result } = await PersonModel.ListPersons()

		return res.status(200).json(result);
	}

	async GetPerson(req: Request, res: Response) {
		const { id } = req.params

		const { result, err } = await PersonModel.GetPerson(id)

		if (err != null) {
			return res.status(400).json(err)
		} else {
			return res.status(200).json(result)
		}
	}

	async AddNewPerson(req: Request, res: Response) {
		const { name } = req.body

		const { result, err } = await PersonModel.AddNewPerson(name)

		if (err != null) {
			return res.status(400).json(err)
		} else {
			return res.status(201).json(result)
		}
	}

	async UpdatePerson(req: Request, res: Response) {
		const { id } = req.params;
		const { name } = req.body;

		const { result, err } = await PersonModel.UpdatePerson(id, name)

		if (err != null) {
			return res.status(400).json(err)
		} else {
			return res.status(200).json(result)
		}
	}

	async DeletePerson(req: Request, res: Response) {
		const { id } = req.params

		const { result, err } = await PersonModel.DeletePerson(id)

		if (err != null) {
			return res.status(400).json(err)
		} else {
			return res.status(200).json(result)
		}
	}

	async GetGenealogy(req: Request, res: Response) {
		const { id } = req.params

		const { result, err } = await PersonModel.GetGenealogy(id)

		if (err != null) {
			return res.status(400).json(err)
		} else {
			return res.status(200).json(result)
		}
	}
};
