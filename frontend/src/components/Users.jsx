import UserCard from "./UserCard";

const Users = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
  );
};

export default Users;
