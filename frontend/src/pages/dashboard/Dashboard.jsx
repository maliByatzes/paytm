import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Users from "@/src/components/Users";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex items-center justify-between px-5 py-4">
        <h1 className="text-2xl font-bold">Payments App</h1>

        <div className="flex items-center justify-center gap-2">
          <p>Hello, User</p>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Separator />

      <p className="my-4 font-semibold text-xl pl-3"><span className="font-bold">Your Balance</span> $5000</p>

      <div className="flex flex-col items-start justify-center px-4 gap-4">
        <p className="font-semibold text-2xl">Users</p>

        <Input type="text" placeholder="Search users..." />

        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
