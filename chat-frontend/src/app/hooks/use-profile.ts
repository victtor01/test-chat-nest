import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface IProfile {
  id: string;
  nickname: string;
}

function useProfile() {
  const useInformations = (): { profile: IProfile | null } => {
    const [profile, setProfile] = useState<IProfile | null>(null);

    useEffect(() => {
      const cookie = Cookies.get("profile") || null;
      if (cookie) {
        const data = JSON.parse(cookie);
        setProfile(data);
      }
    }, []);

    return {
      profile
    }
  };

  return {
    useInformations,
  };
}

export { useProfile };
