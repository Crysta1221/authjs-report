import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import type { Provider } from "next-auth/providers";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import type { Account, Profile } from "next-auth";
import { Guild, UserInfo } from "../types/next-auth";

const providers: Provider[] = [
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    authorization:
      "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds",
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    session: async ({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { accessToken?: string; id?: string };
    }) => {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      const userInfo = await getUserinfo(token.accessToken!);
      session.user_full = userInfo;
      return session;
    },
    jwt: async ({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account: Account | null;
      profile?: Profile | null;
    }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.id = profile.id;
      }
      return token;
    },
    signIn: async ({ account, user, profile }) => {
      if (account == null || account.access_token == null) return false;
      return await isJoinGuild(account.access_token);
    },
  },
});

export const isJoinGuild = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch guilds");
    }

    const guilds = (await response.json()) as Guild[];
    const tatamiGuildId = process.env.DISCORD_GUILD_ID;

    return guilds.some((guild) => guild.id === tatamiGuildId);
  } catch (error) {
    console.error("Error checking guild membership:", error);
    return false;
  }
};

export const getUserinfo = async (accessToken: string): Promise<UserInfo> => {
  try {
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    return (await response.json()) as UserInfo;
  } catch (error) {
    return {} as UserInfo;
  }
};
