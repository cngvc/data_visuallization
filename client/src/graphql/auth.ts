import { gql, type TypedDocumentNode } from '@apollo/client';
import type { MutationResponse } from './mutations';
import type { IAuthUser } from './queries';

export interface SignupInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  organization_name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LogoutInput {
  refreshToken: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordInput {
  current_password: string;
  new_password: string;
}

export interface UpdateMeInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  current_organization_id?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IAuthUser;
}

export const SIGNUP_MUTATION: TypedDocumentNode<{ signup: AuthResponse }, { input: SignupInput }> = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      accessToken
      refreshToken
      user {
        _id
        email
        role
      }
    }
  }
`;

export const LOGIN_MUTATION: TypedDocumentNode<{ login: AuthResponse }, { input: LoginInput }> = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        _id
        email
        role
      }
    }
  }
`;

export const LOGOUT_MUTATION: TypedDocumentNode<{ logout: MutationResponse }, { input: LogoutInput }> = gql`
  mutation Logout($input: LogoutInput!) {
    logout(input: $input) {
      success
      message
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION: TypedDocumentNode<{ forgot_password: MutationResponse }, { input: ForgotPasswordInput }> = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgot_password(input: $input) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD_MUTATION: TypedDocumentNode<{ reset_password: MutationResponse }, { input: ResetPasswordInput }> = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    reset_password(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_ME_MUTATION: TypedDocumentNode<{ update_me: MutationResponse }, { input: UpdateMeInput }> = gql`
  mutation UpdateMe($input: UpdateMeInput!) {
    update_me(input: $input) {
      success
      message
    }
  }
`;

export const REFRESH_TOKEN_MUTATION: TypedDocumentNode<{ refresh_token: AuthResponse }, { input: RefreshTokenInput }> = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refresh_token(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION: TypedDocumentNode<{ change_password_me: MutationResponse }, { input: ChangePasswordInput }> = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    change_password_me(input: $input) {
      success
      message
    }
  }
`;
