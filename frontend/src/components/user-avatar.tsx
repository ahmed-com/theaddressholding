import { Avatar, AvatarFallback } from "./ui/avatar";
import { type User } from "@/hooks/useAuth";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar>
      <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
    </Avatar>
  );
}
