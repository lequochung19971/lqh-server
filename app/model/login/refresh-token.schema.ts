import { Document, model, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
  token: string;
  email: string;
}

const refreshToken: Schema = new Schema({
  token: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

export default model<IRefreshToken>('refreshToken', refreshToken);