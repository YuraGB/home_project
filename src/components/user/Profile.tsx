"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "@/components/user/hooks/useProfile";
import Link from "next/link";
import { ApiKey } from "./apiKey";
import { LogOut } from "./LogOut";
import SubscribeButton from "../subscribtion/Subscribtion";

export const Profile = () => {
  const { userData, logOut } = useProfile();

  if (!userData) {
    return <Link href={"/login"}>Login</Link>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Profile</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SubscribeButton userId={userData.id} />
        </DropdownMenuItem>

        <DropdownMenuItem>
          <ApiKey apiKey={userData.apikey} email={userData.email} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut logOut={logOut} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
