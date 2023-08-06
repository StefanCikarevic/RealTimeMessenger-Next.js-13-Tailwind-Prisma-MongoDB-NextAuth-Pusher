import { getServerSession } from "next-auth";
// @ts-ignore
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getSession() {
  return await getServerSession(authOptions);
}
