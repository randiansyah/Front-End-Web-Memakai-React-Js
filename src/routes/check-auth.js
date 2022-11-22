import decode from "jwt-decode";
import cookies from "js-cookie";

const checkAuth = () => {
  const jwtToken = cookies.get("jwtToken");

  if (!jwtToken) return false;

  try {
    const { exp } = decode(jwtToken);

    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

export default checkAuth;
