import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

const LoginGoogle = () => {

  const loginWithGoogle = async () => {
    try {

      const result = await signInWithPopup(auth, provider);

      console.log(result.user);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={loginWithGoogle}>
      Login With Google
    </button>
  );
};

export default LoginGoogle;