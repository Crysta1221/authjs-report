import { Session as NextAuthSession } from "next-auth";

declare module "next-auth" {
  interface Session extends NextAuthSession {
    accessToken?: string;
    user?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
    };
    user_full?: UserInfo;
  }
}

export interface Guild {
  features: string[];
  icon: string;
  id: string;
  name: string;
  owner: boolean;
  permissions: number;
  permissions_new: string;
}

export interface UserInfo {
  id: number;
  username: string;
  discriminator?: string | null;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string | null;
  accent_color?: number | null;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration_data?: AvatarDecorationData[];
}

export interface AvatarDecorationData {
  asset: string;
  sku_id: number;
}
