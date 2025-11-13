import AuthModel, { IAuth } from '@/entities/auth.entity';
import { IAuthPayload } from '@/interfaces/auth.interface';
import { BadRequestError, NotAuthorizedError } from '@/interfaces/responses/error-handler';
import { decode, verify } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { keyTokenService } from './key-token.service';

class AuthService {
  constructor() {}

  async getAuthUser(params: Record<string, any>): Promise<IAuth | null> {
    return AuthModel.findOne(params);
  }

  async createAuthUser(data: Partial<IAuth>): Promise<IAuth> {
    const user = new AuthModel(data);
    return await user.save();
  }

  async getUserById(id: string | mongoose.Types.ObjectId): Promise<IAuth | null> {
    return AuthModel.findById(id).populate(['current_organization_id']).lean();
  }

  async getUserByEmail(email: string): Promise<IAuth | null> {
    return AuthModel.findOne({ email }).populate(['current_organization_id']).lean();
  }

  getUserByJwt = async (token: string): Promise<IAuthPayload | null> => {
    try {
      if (!token) return null;
      const tokenPayload = decode(token) as IAuthPayload;
      const keyToken = await keyTokenService.findKeyToken({
        authId: tokenPayload.id
      });
      if (!keyToken || !keyToken.publicKey) {
        throw new NotAuthorizedError('Public key not found', 'verifyAccessToken');
      }
      const payload = verify(token, keyToken.publicKey) as IAuthPayload;
      const userExists = await AuthModel.exists({ _id: payload?.id });
      if (!userExists) return null;
      return payload;
    } catch (error) {
      return null;
    }
  };

  async updateUser(id: mongoose.Types.ObjectId, data: Partial<IAuth>): Promise<Partial<IAuth> | null> {
    try {
      const user = await AuthModel.findById(id);
      if (!user) return null;
      const updateData = { ...data };
      if (updateData.password && typeof updateData.password === 'string' && updateData.password.trim() !== '') {
        user.password = updateData.password;
        delete updateData.password;
        Object.assign(user, updateData);
        await user.save();
      } else {
        await AuthModel.updateOne({ _id: id }, updateData);
      }
      const updatedUser = await this.getUserById(id);
      if (!updatedUser) {
        throw new BadRequestError(`Failed to retrieve updated user with id: ${id}`, 'updateUser');
      }
      return updatedUser;
    } catch (error) {
      return null;
    }
  }

  async updatePassword(id: string, newPassword: string): Promise<Partial<IAuth> | null> {
    try {
      const user = await AuthModel.findById(id);
      if (!user) return null;
      user.password = newPassword;
      await user.save();
      const updatedUser = await this.getUserById(id);
      if (!updatedUser) {
        throw new BadRequestError(`Failed to retrieve updated user with id: ${id}`, 'updatePassword');
      }
      return updatedUser;
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();
