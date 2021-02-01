import refreshToken, { IRefreshTokenDocument } from './refresh-token.schema';

export class AuthService {
  async saveRefreshToken(query: {email: string, token: string}): Promise<IRefreshTokenDocument> {
    const model = new refreshToken(query);
    return model.save();
  }

  async findCurrentRefreshToken(token: string): Promise<IRefreshTokenDocument> {
    return refreshToken.findOne({token});
  }
}