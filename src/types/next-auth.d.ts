import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email?: string|null;
      id?: string;
      name?: string | null;
      role?: string;
      accessToken?: string;
      profileStatus?: string;
      verified?: boolean;
    }
  };
  interface User {
    email: string;
    id: string | number; // Match the ID type you use
    name: string | null;
    role: string;
    verified: boolean;
  }
}
