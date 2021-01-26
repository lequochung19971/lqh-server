import refreshToken, { IRefreshToken } from './refresh-token.schema';

export class RefreshTokenService {
  async saveRefreshToken(query: {email: string, token: string}): Promise<IRefreshToken> {
    const model = new refreshToken(query);
    return model.save();
  }

  async findCurrentRefreshToken(token: string): Promise<IRefreshToken> {
    return refreshToken.findOne({token});
  }
}