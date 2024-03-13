import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string,
            email: string,
            image: string,
            // role: string,
            // token: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        token: string
    }
}