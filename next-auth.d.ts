import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string,
            email: string,
            image: string,
            role: string,
            token: string,
            serverToken: string
            picture: string
        }
    }
    interface User {
        id: string,
        name: string,
        email: string,
        image: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        token: string
    }
}