import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import SearchBar from "../search-bar";
export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="flex flex-col items-center gap-4 p-4 lg:flex-row">
        <div className="flex w-full items-center justify-between lg:w-auto">
          {/*logo and clerk */}
          <Link href={"/"} className="shrink-0 font-bold">
            <Image
              src={logo}
              alt="logo"
              height={100}
              width={100}
              className="w-24 text-primary-foreground lg:w-28"
            />
          </Link>

          <div className="lg:hidden">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="rounded-lg border border-gray-300 bg-gray-300 px-3 py-1.5 text-sm text-gray-800 transition-all hover:bg-gray-500">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
        <div className="w-full lg:max-w-2xl">
          <SearchBar />
        </div>

        {/* desktop */}
        <div className="ml-auto hidden lg:block">
          <SignedIn>
            <div className="flex items-center gap-3">
              <Link href={"/seller"}>
                <button className="rounded-lg bg-primary/80 px-3 py-1.5 text-sm text-white shadow-lg transition-all hover:bg-primary hover:shadow-none">
                  Sell Tickets
                </button>
              </Link>
              <Link href={"/tickets"}>
                <button className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5 text-sm text-gray-800 shadow-lg transition-all hover:bg-gray-200 hover:shadow-none">
                  My Tickets
                </button>
              </Link>
              <UserButton />
            </div>
          </SignedIn>
        </div>

        {/* mobile action button */}
        <div className="lg:hidden w-full flex justify-center gap-3">
          <SignedIn>
              <Link href={"/seller"} className=" flex-1">
                <button className="rounded-lg w-full bg-primary/80 px-3 py-1.5 text-sm text-white shadow-lg transition-all hover:bg-primary hover:shadow-none">
                  Sell Tickets
                </button>
              </Link>
              <Link href={"/tickets"} className="flex-1">
                <button className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5 text-sm text-gray-800 shadow-lg transition-all hover:bg-gray-200 hover:shadow-none">
                  My Tickets
                </button>
              </Link>
          </SignedIn>

        </div>
      </div>
    </header>
  );
}
