"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChartBarStacked,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  UserCog,
} from "lucide-react";
import { logout } from "@/actions/logout";
import type { ExtendedUser } from "@/next-auth";
import { UserRole } from "@prisma/client";

const UserMenu = ({ user }: { user: ExtendedUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar className="h-10 w-10 ring-2">
          <AvatarImage
            src={user.image ?? ""}
            alt={user?.name?.[0]?.toUpperCase()}
          />
          <AvatarFallback>
            <User className="text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <p>{user.name}</p>
          <p className="font-normal text-muted-foreground">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard" className="flex">
              <ChartBarStacked className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <DropdownMenuShortcut>
                <kbd>⌘D</kbd>
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/settings" className="flex">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>
                <kbd>⌘S</kbd>
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          {user.role === UserRole.ADMIN && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin" className="flex">
                <UserCog className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
                <DropdownMenuShortcut>
                  <kbd>⌘A</kbd>
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/contact">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>contact</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            void logout();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>
            <kbd>⌘Q</kbd>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
