import getSession from "@/app/actions/getSection";
import prisma from "@/app/libs/prismadb";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!user) return null;
    return user;
  } catch (err) {
    return null;
  }
};
export default getCurrentUser;
