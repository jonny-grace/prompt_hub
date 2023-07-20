import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectToDb } from "@utils/database"
import { signIn } from "next-auth/react";
import User from "@model/user";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_iD,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      let SesionUser;
      if (session.user.email) {
        SesionUser = await User.findOne({
          email: session.user.email,
        });
      }
      if (SesionUser) {
        session.user.id = SesionUser._id.toString();
      }
      return session;
    },
    // async session({ session }) {
    //   const SesionUser = await User.findOne({
    //     email: session.user.email,
    //   });

    //   session.user.id = SesionUser._id.toString();

    //   return session;
    // },
    async signIn({ profile }) {
      try {
        await connectToDb();
        const userExists = await User.findOne({
          email: profile.email
        });
        if (!userExists) {
          await User.create({
            email: profile.email,
            userName: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      }
      catch (e) {
        console.log(e)
        return false
      }



    }
  }
})

export { handler as GET, handler as POST }