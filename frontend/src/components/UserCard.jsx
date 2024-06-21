import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const UserCard = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>U</AvatarFallback>  
        </Avatar>

        <p className="font-bold text-xl">User</p>
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
                  <AvatarFallback>U</AvatarFallback>  
                </Avatar>

                <p className="font-bold text-xl">User's Name</p>
              </div>

              <p className="font-semibold text-sm">Amount (in Rs)</p>

              <form className="flex flex-col justify-center gap-3 w-full">
                <Input type="text" placeholder="Enter amount" />

                <Button>Initiate Transfer</Button>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default UserCard;
