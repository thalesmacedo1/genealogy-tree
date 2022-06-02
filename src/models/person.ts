import Person from "./scheme"

export default class PersonModel {
	async ListPersons() {
		const result = await Person.find()

		return { result, err: null }
	}

	async GetPerson(id: String) {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			return { result: null, err: {error: 'id is not a valid person id'} }
		}

		const result = await Person.findById(id)

		if (!result) {
			return { result: null, err: {error: 'person not found'} }
		}

		return { result, err: null }
	}

	async AddNewPerson(name: String) {
		if (name == undefined || name == null) {
			return { result: null, err: {error: 'field name is required'} }
		}

		const newPerson = {
			name: name,
			parents: []
		}

		const result = await Person.create(newPerson);

		return { result, err: null }
	}

	async UpdatePerson(id: String, name: String) {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			return { result: null, err: {error: 'id is not a valid person id'} }
		}
		const targetPerson = await Person.findById(id)

		if (!targetPerson) {
			return { result: null, err: {error: 'person not found'} }
		}

		targetPerson.name = name;

		const result = await targetPerson.save()

		return { result, err: null }
	}

	async DeletePerson(id: String) {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			return { result: null, err: {error: 'id is not a valid person id'} }
		}
		const person = await Person.findById(id)

		if (!person) {
			return { result: null, err: {error: 'person not found'} }
		}

		const childrenFilter = { parents: id };
		const children = await Person.find(childrenFilter)

		for (let i = 0; i < children.length; i++) {
			let parentIndex = children[i].parents.indexOf(id)
			children[i].parents.splice(parentIndex, 1)
			children[i].save()
		}

		const result = await Person.findOneAndDelete({ _id: id })

		return { result, err: null }
	}

	async GetGenealogy(id: String) {
		if (!id.match(/^[0-9a-fA-F]{24}$/)) {
			return { result: null, err: {error: 'id is not a valid person id'} }
		}
		const person = await Person.findById(id)

		if (!person) {
			return { result: null, err: {error: 'person not found'} }
		}

		const treeFilter = [
			{
				$graphLookup: {
					from: 'members',
					startWith: '$parents',
					connectFromField: 'parents',
					connectToField: '_id',
					as: 'ascendants'
				}
			},
		]

		const allTree = await Person.aggregate(treeFilter)
		const result = allTree.find(item => item._id == id)

		return { result, err: null }
	}
}