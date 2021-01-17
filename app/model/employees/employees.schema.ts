import { model, Schema } from 'mongoose';
import { ModificationNoteSchema } from '../../providers/schema/modification-note.schema';

const employeesSchema: Schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  department: {
    type: Object,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  addressInfo: {
    type: Object,
    required: true,
  },
  idCardInfo: {
    type: Object,
    required: true,
  },
  password: {
    type: Object,
    required: false,
  },
  avatar: {
    type: String
  },
  modificationNote: [ModificationNoteSchema],
});

export default model('employees', employeesSchema);
