import { model, Schema } from 'mongoose';
import { ModificationNoteSchema } from '../../providers/schema/modification-note.schema';

const employeesSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: Object,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  avatar: String,
  modificationNote: [ModificationNoteSchema],
});

export default model('employees', employeesSchema);
