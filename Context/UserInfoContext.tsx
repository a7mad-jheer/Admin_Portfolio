"use client";
import { supabase } from "@/lib/supabase";
import { createContext, useContext, useState, useEffect } from "react";

type statusType = "loadingUser" | "authenticated" | "unauthenticated";

type userInfo_Type = {
  email: string | null;
  user_id: string | null;
};

type userContext_Type = {
  userInfo: userInfo_Type | null;
  statusUser: statusType;
};

export const userContext = createContext<userContext_Type | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<userInfo_Type | null>(null);
  const [statusUser, setStatusUser] = useState<statusType>("loadingUser");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUserInfo({
          user_id: session.user.id,
          email: session.user.email || null,
        });
        setStatusUser("authenticated");
      } else {
        setUserInfo(null);
        setStatusUser("unauthenticated");
      }
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_ , session) => {
        if (session?.user) {
          setUserInfo({
            email: session.user.email || null,
            user_id: session.user.id,
          });
          setStatusUser("authenticated");
        } else {
          setUserInfo(null);
          setStatusUser("unauthenticated");
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <userContext.Provider value={{ userInfo, statusUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
