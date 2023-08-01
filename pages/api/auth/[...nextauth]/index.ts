import { authOptions } from "@/src/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export default handler
