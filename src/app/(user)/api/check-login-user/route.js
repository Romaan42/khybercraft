import checkLoginUser from "@/lib/checkLoginUser";

export const GET = async () => {
  try {
    const user = await checkLoginUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user doesn't logged in!",
        },
        {
          status: 401,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "user logged in!",
        user,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "something went wrong!" },
      { status: 500 },
    );
  }
};
