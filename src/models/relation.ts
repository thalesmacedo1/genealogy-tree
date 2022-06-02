import Person from "./scheme"
import personModel from "./person"

const PersonModel = new personModel();


export default class RelationModel {
	async AddNewRelation(parent: String, children: String) {
		if (!parent.match(/^[0-9a-fA-F]{24}$/) || !children.match(/^[0-9a-fA-F]{24}$/)) {
			return { result: null, err: { error: 'id is not a valid person id' } }
		}
		if (parent == children) {
			return { result: null, err: { error: 'parent and child cannot be the same person' } }
		}

		const childOnDB = await Person.findById(children)
		const parentOnDB = await Person.findById(parent)

		if (!childOnDB) {
			return { result: null, err: { error: 'child not found' } }
		}

		if (!parentOnDB) {
			return { result: null, err: { error: 'parent not found' } }
		}

		if (childOnDB.parents.length >= 2) {
			return { result: null, err: { error: 'a person cannot have more than two parents' } }
		}

		const isFatherAlready = childOnDB.parents.includes(parent)
		if (isFatherAlready) {
			return { result: null, err: { error: 'the person is already parent of the target child' } }
		}

		const parentTree = await PersonModel.GetGenealogy(parent)
		const isAscendant = parentTree.result.ascendants.some((item: any) => item._id == children)
		if (isAscendant) {
			return { result: null, err: { error: 'a person cannot be father of its ascendants' } }
		}

		childOnDB.parents.push(parentOnDB._id)

		const result = await childOnDB.save()

		return { result, err: null }
	}

	async DeleteRelation(parent: String, children: String) {
		if (!parent.match(/^[0-9a-fA-F]{24}$/) || !children.match(/^[0-9a-fA-F]{24}$/)) {
			return { result: null, err: { error: 'id is not a valid person id' } }
		}
		if (parent == children) {
			return { result: null, err: { error: 'parent and child cannot be the same person' } }
		}

		const childOnDB = await Person.findById(children)
		const parentOnDB = await Person.findById(parent)

		if (!childOnDB) {
			return { result: null, err: { error: 'child not found' } }
		}

		if (!parentOnDB) {
			return { result: null, err: { error: 'parent not found' } }
		}

		const index = childOnDB.parents.indexOf(parent);
		if (index > -1) {
			childOnDB.parents.splice(index, 1);
		} else {
			return { result: null, err: { error: 'parent not found' } }
		}

		const result = await childOnDB.save()

		return { result, err: null }
	}
}