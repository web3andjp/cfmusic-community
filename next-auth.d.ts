declare module "next-auth" {
  interface User {
    registered: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      registered: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    registered: boolean;
  }
}