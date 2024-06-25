import { Input } from "@/components/ui/input";
import UserCard from "./UserCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const getUsers = async (filterName) => {
      try {
        const res = await fetch(`/api/v1/users/bulk/?filter=${filterName}`);
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getUsers(""); // pass an empty string for now
  }, [])

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = users.filter((user) => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()));

    setFilteredUsers(filteredItems);
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search users..."
        onChange={handleInputChange}
        value={searchItem}
      />

      <ScrollArea className="flex flex-col w-full h-[400px]">
        {filteredUsers.map((user) => (
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
