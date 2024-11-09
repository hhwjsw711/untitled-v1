import { GoogleSignin } from "@/components/google-signin";
import Image from "next/image";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center size-96">
        <Image
          src="/logo-v1.png"
          alt="logo"
          width={100}
          height={100}
          className="mb-10"
        />
        <GoogleSignin />
      </div>
    </div>
  );
}
