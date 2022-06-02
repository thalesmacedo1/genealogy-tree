import { Request, Response } from 'express'
import relationModel from "../models/relation"

const RelationModel = new relationModel();

export default class RelationController {
	async AddNewRelation(req: Request, res: Response) {
		const { parent, children } = req.params

		const { result, err } = await RelationModel.AddNewRelation(parent, children)

		if (err != null) {
			return res.status(400).json(err)
		} else {
			return res.status(200).json(result)
		}
	}

	async DeleteRelation(req: Request, res: Response) {
		const { parent, children } = req.params

		const { result, err } = await RelationModel.DeleteRelation(parent, children)

		if (err != null) {
			return res.status(400).json(err)
		} else {
			return res.status(200).json(result)
		}
	}
};
