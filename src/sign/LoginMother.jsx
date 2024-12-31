import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router";

export default function LoginMother() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate(`/signup`);
        return;
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return <>{user && children}</>;
}
