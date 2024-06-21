import { Input } from "@/components/ui/input";
import useGetUsers from "../hooks/useGetUsers";
import UserCard from "./UserCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const Users = () => {
  // TODO: implement search feature
  const { loading, users } = useGetUsers();
  
  return (
    <>
    <Input type="text" placeholder="Search users..." />
    
    <ScrollArea className="flex flex-col w-full h-[400px]">      
      {users.map((user) => (
        <UserCard 
          key={user._id}
          user={user}  
        />
      ))}
    </ScrollArea>
    
  </>
  );
};

export default Users;
