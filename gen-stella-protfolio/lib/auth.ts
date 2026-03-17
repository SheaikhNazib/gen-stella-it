import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, DefaultSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"]
  }

  interface User {
    role?: "ADMIN" | "USER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
    id?: string;
  }
}

const ADMIN_GITHUB_USERNAMES = ["niloydiu", "niloykm"];

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET || "stella-it-session-secret-2026",
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: ADMIN_GITHUB_USERNAMES.includes(profile.login) ? "ADMIN" : "USER",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Credentials authorize called", { username: credentials?.username });
        if (
          credentials?.username === "admin" &&
          credentials?.password === "admin2026"
        ) {
          const user = {
            id: "admin-user",
            name: "Stella Admin",
            email: "admin@stella-it.com",
            role: "ADMIN",
          };
          console.log("Credentials authorize: success", { id: user.id, name: user.name });
          return user;
        }
        console.log("Credentials authorize: failed for", { username: credentials?.username });
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },
    async jwt({ token, user, profile }) {
      console.log("JWT callback invoked", { token, user, profile });
      // Step 1: Initial login (from GitHub or Credentials)
      if (user) {
        token.role = (user as any).role || "USER";
        token.id = user.id;
        return token;
      }

      // Step 2: Handle hardcoded admin session directly
      if (token.id === "admin-user") {
        token.role = "ADMIN";
        return token;
      }

      // Step 3: Handle existing database users
      try {
        const dbUser = await db.user.findFirst({
          where: {
            email: token.email ?? undefined,
          },
        });

        if (dbUser) {
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
            role: dbUser.role,
          };
        }
      } catch (error) {
        console.error("JWT Callback DB Error:", error);
      }

      return token;
    },
  },
};
