import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="flex-col flex lg:flex-row items-center gap-4 p-4">
        <div className=" flex items-center justify-between w-full lg:w-auto">
          {/*logo and clerk */}
          <Link href={"/"} className="font-bold shrink-0">
            <Image
              src={logo}
              alt="logo"
              height={100}
              width={100}
              className="w-24 lg:w-28"
            />
          </Link>
          {/* auth */}
          <div className="lg:hidden">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="bg-gray-300 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-500 transition-all border border-gray-300 ">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
        <div className="w-full lg:max-w-2xl">
            
        </div>
      </div>
    </header>
  );
}
