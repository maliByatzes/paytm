import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Users from "@/src/components/Users";
import { useAuthContext } from "@/src/context/AuthContext";
import useGetBalance from "@/src/hooks/useGetBalance";
import useLogout from "@/src/hooks/useLogout";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { authUser } = useAuthContext();
  const { loading, balance } = useGetBalance();
  const { laoding: loading2, logout } = useLogout();

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex items-center justify-between px-5 py-4">
        <h1 className="text-2xl font-bold">Payments App</h1>

        <div className="flex items-center justify-center gap-2">
          <p>Hello, {authUser.username}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>{authUser.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onSelect={logout}>
                {loading2 ? <Loader2 className="w-4 h-4 animate-spin" /> : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />

        </div>
      </div>

      <Separator />

      <p className="my-4 font-semibold text-xl pl-3"><span className="font-bold">Your Balance</span> ${balance.balance}</p>

      <div className="flex flex-col items-start justify-center px-4 gap-4">
        <p className="font-semibold text-2xl">Users</p>

        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
