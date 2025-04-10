import { currentUser } from "@/server/auth";
import { Button } from "../ui/button";
import { LoginButton } from "../auth/login-button";
import { MobileNav } from "./mobile-nav";
import { MainNav } from "./main-nav";
import Link from "next/link";
import { Icons } from "../icons";
import UserMenu from "../user/user-menu";
import { mainLinks } from "@/config/nav-links";

export default async function SiteHeader() {
  const user = await currentUser();
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-transparent dark:border-b">
      <div className="container flex h-14 items-center justify-between">
        <Link
          href="/"
          className="mx-6 hidden items-center space-x-2 font-bold text-primary md:flex"
        >
          <Icons.logo className="h-10 w-10" />
        </Link>
        <MainNav params={{ mainLinks }} />
        <MobileNav params={{ mainLinks }} />
        <div className="flex items-center space-x-2 md:justify-end">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <LoginButton asChild>
              <Button>Sign in</Button>
            </LoginButton>
          )}
        </div>
      </div>
    </header>
  );
}
