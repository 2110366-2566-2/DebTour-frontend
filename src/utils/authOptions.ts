import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import isUserExist from "@/lib/isUserExist";
import { cookies } from "next/headers";

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET??"",
    pages: {
        signIn: '/auth',
        error: '/error',
    },
  // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID??"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture??'',
                    // role: profile.role ? profile.role : "user"
                }
            }
        })
    ],
    session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.image = user.image
            }
            if (token.serverToken === undefined) {
                const response = await isUserExist('google', {id: user.id, token: token.token})
                if (response.success) {
                    token.role = response.id
                    token.serverToken = response.token
                }
            }
            return token
        },
        async session({ session, token }) {
            return {...session, user: token}
        },
        async signIn({ account, profile }) {
            const cookieStore = cookies()
            try {
                if(profile && 'at_hash' in profile) {
                    const googleUser = {
                        id: profile.sub,
                        email: profile.email,
                        name: profile.name,
                        image: profile.image??'',
                        token: profile.at_hash
                    }
                    const response = await isUserExist('google', googleUser)
                    if (!response.success) {
                        cookieStore.set({name:'googleUser', value:JSON.stringify(googleUser), httpOnly: false})
                        return '/auth/signup/'
                    }
                    return true
                }
                return false
            } catch (e) {
                console.error(e)
                return false
            }
            return false
        },
    }
}