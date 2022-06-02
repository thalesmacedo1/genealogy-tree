import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person"
  }]
}, { collection: 'members' });

const Person = mongoose.model('Person', personSchema);
export default Person;