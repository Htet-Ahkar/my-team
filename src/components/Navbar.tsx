/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { persistor } from "@/store/store";

const Navbar = () => {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login";

  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  return (
    !hideNavbar && (
      <nav className="bg-background sticky top-0 z-10 flex items-center justify-between border p-4">
        {/* left */}
        <div className="text-xl font-black">
          <Link href="/">My-Team</Link>
        </div>
        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* USER MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex-center gap-5">
              <span>{user?.userName || "user"}</span>

              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/79957627?v=4" />
                <AvatarFallback>{user?.userName || "user"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-[1.2rem] w-[1.2rem]" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-[1.2rem] w-[1.2rem]" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  persistor.purge(); // Clear persisted data
                  dispatch(logout());
                }}
                variant="destructive"
              >
                <LogOut className="mr-2 h-[1.2rem] w-[1.2rem]" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    )
  );
};

export default Navbar;
