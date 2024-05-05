import { cookies } from "next/headers";

const useSession = () => {
  const isSessionValid = async () => {
    const sessionCookie = cookies().get("access_token");
    const refresh_token = cookies().get("refresh_token");

    if (!sessionCookie || !refresh_token) {
      return false;
    }

    return true;
  };

  return {
    isSessionValid,
  };
};

export { useSession };
