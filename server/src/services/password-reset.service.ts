import PasswordResetModel, { IPasswordReset } from '@/entities/password-reset.entity';
import cryptoRandomString from 'crypto-random-string';
import mongoose from 'mongoose';

class PasswordResetService {
  constructor() {}

  async generateToken(authId: string): Promise<IPasswordReset> {
    await PasswordResetModel.deleteMany({ authId });
    const token = cryptoRandomString({ length: 64, type: 'url-safe' });
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const resetToken = new PasswordResetModel({
      authId: new mongoose.Types.ObjectId(authId),
      token,
      expiresAt,
      isUsed: false
    });

    return await resetToken.save();
  }

  async findByToken(token: string): Promise<IPasswordReset | null> {
    return PasswordResetModel.findOne({
      token,
      isUsed: false,
      expiresAt: { $lt: new Date() }
    }).exec();
  }

  async validateToken(token: string): Promise<IPasswordReset | null> {
    const resetToken = await PasswordResetModel.findOne({
      token,
      isUsed: false
    }).exec();
    if (!resetToken) {
      return null;
    }
    if (new Date() > resetToken.expiresAt) {
      return null;
    }
    return resetToken;
  }

  async markTokenAsUsed(token: string): Promise<boolean> {
    const result = await PasswordResetModel.updateOne({ token }, { isUsed: true });
    return result.modifiedCount > 0;
  }

  async cleanupExpiredTokens(): Promise<void> {
    await PasswordResetModel.deleteMany({ expiresAt: { $lt: new Date() } });
  }
}

export const passwordResetService = new PasswordResetService();
