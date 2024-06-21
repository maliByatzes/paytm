import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useTransferMoney from "../hooks/useTransferMoney";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const UserCard = ({ user }) => {
  const [amount, setAmount] = useState("");
  const { loading, transferMoney } = useTransferMoney();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await transferMoney(user._id, amount);
  };

  return (
    <div className="flex items-center justify-between my-4 sm:px-4">
      <div className="flex items-center justify-center gap-3">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <p className="hidden sm:block font-bold text-xl">{user.firstName + " " + user.lastName}</p>
        <p className="sm:hidden font-bold text-xl">{user.firstName}</p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Send Money</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="mb-10 text-center font-bold text-3xl">Send Money</DialogTitle>
            <div className="flex flex-col w-full gap-2 justify-center items-start px-2">
              <div className="flex items-center justify-center gap-4">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>

                <p className="font-bold text-xl">{user.firstName}</p>
              </div>

              <p className="font-semibold text-sm">Amount (in Rs)</p>

              <form className="flex flex-col justify-center gap-3 w-full" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <Button>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Initiate Transfer" }
                </Button>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default UserCard;
