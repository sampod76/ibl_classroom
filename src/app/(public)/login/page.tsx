import LoginComponent from "@/components/Login/LoginPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "...",
};
const LoginPage = () => {
  return (
    <>
      <LoginComponent />
    </>
  );
};

export default LoginPage;
