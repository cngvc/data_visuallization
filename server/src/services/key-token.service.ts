import { IAuth } from '@/entities/auth.entity';
import KeyTokenModel, { IKeyToken } from '@/entities/key-token.entity';
import { IAuthPayload } from '@/interfaces/auth.interface';
import { BadRequestError, NotAuthorizedError } from '@/interfaces/responses/error-handler';
import { IDeviceInfo } from '@/utils/device.util';
import { generateKeyPair } from '@/utils/generate.util';
import { sign, verify } from 'jsonwebtoken';
import mongoose from 'mongoose';

export interface CreateKeyTokenParams {
  authId: string;
  refreshToken?: string;
  userAgent?: IDeviceInfo;
  ipAddress?: string;
}

class KeyTokenService {
  constructor() {}

  findKeyToken = async (params: Record<string, any>): Promise<IKeyToken | null> => {
    return await KeyTokenModel.findOne(params).sort({ lastUsedAt: -1 }).exec();
  };

  findKeyTokensByAuthId = async (authId: string): Promise<IKeyToken[]> => {
    return await KeyTokenModel.find({ authId }).sort({ lastUsedAt: -1 }).exec();
  };

  deleteKeyToken = async (params: Record<string, any>) => {
    await KeyTokenModel.deleteMany(params);
  };

  generateTokens = async ({ user, userAgent, ipAddress }: { user: IAuth; userAgent?: IDeviceInfo; ipAddress?: string }) => {
    const tokens = await this.createTokenPair({
      payload: {
        id: user._id ? user._id.toString() : (user.id as string),
        email: user.email,
        role: user.role
      },
      userAgent,
      ipAddress
    });
    return tokens;
  };

  createKeyToken = async ({ authId, userAgent, ipAddress }: CreateKeyTokenParams): Promise<IKeyToken> => {
    const { publicKey, privateKey } = generateKeyPair();
    const authIdObj = typeof authId === 'string' ? new mongoose.Types.ObjectId(authId) : authId;
    const keyTokenData: Record<string, any> = {
      authId: authIdObj,
      publicKey,
      privateKey
    };
    if (userAgent) {
      Object.assign(keyTokenData, {
        ...userAgent,
        ipAddress: ipAddress || '',
        lastUsedAt: new Date()
      });
    }
    const keyToken = new KeyTokenModel(keyTokenData);
    return await keyToken.save();
  };

  updateLastUsed = async (id: string) => {
    await KeyTokenModel.updateOne({ _id: id }, { lastUsedAt: new Date() });
  };

  createTokenPair = async ({
    payload,
    userAgent,
    ipAddress
  }: {
    payload: Partial<IAuthPayload>;
    userAgent?: IDeviceInfo;
    ipAddress?: string;
  }): Promise<{ accessToken: string; refreshToken: string; keyToken: IKeyToken }> => {
    try {
      const keyToken = await this.createKeyToken({ authId: payload.id!, userAgent, ipAddress });
      const accessToken = sign(payload, keyToken.privateKey, {
        expiresIn: '1d',
        algorithm: 'RS256'
      });
      const refreshToken = sign(payload, keyToken.privateKey, {
        expiresIn: '30d',
        algorithm: 'RS256'
      });
      keyToken.refreshToken = refreshToken;
      await keyToken.save();
      return {
        accessToken,
        refreshToken,
        keyToken
      };
    } catch (error) {
      throw new BadRequestError(`Failed to create token pair`, 'createTokenPair');
    }
  };

  verifyToken = async (token: string, publicKey: string) => {
    try {
      return verify(token, publicKey, { algorithms: ['RS256'] });
    } catch (error) {
      throw new NotAuthorizedError('Invalid or expired token', 'verifyToken');
    }
  };
}

export const keyTokenService = new KeyTokenService();
