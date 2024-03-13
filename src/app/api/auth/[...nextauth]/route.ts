import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import isUserExist from "@/lib/isUserExist";
import { cookies } from "next/headers";
export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET??"",
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
                    image: profile.picture,
                    // role: profile.role ? profile.role : "user"
                }
            }
        })
    ],
    // session: { strategy: 'jwt' },
    callbacks: {
        // async jwt({token, user}){
		// 	return {...token, ...user}
		// },
        async session({ session, token }) {
            // Add property to session, like an access_token from a provider.
            session.user = token as any
            return session
        },
        async signIn({ user, account, profile }) {
            const cookieStore = cookies()
            try {
                if(profile){
                    const googleUser = {
                        id: profile.sub,
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture,
                        token: profile.at_hash
                    }
                    const response = await isUserExist('google', googleUser)
                    // const isExist = false
                    if (!response.success) {
                        cookieStore.set({name:'googleUser', value:JSON.stringify(googleUser), httpOnly: false})
                        return '/auth/signup/'
                    }
                    cookieStore.set({name:'username', value:googleUser.id, httpOnly: true})
                    cookieStore.set({name:'role', value:response.id, httpOnly: true})
                    cookieStore.set({name:'token', value:response.token, httpOnly: true})
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
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}