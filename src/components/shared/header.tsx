import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";
export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="flex-col flex lg:flex-row items-center gap-4 p-4">
        <div className=" flex items-center justify-between w-full lg:w-auto">
          <Link href={"/"} className="font-bold shrink-0">
            <Image
              src={logo}
              alt="logo"
              height={100}
              width={100}
              className="w-24 lg:w-28"
            />
          </Link>
          {/* acct */}
        </div>

      </div>
    </header>
  );
}
