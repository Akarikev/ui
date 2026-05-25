import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/Akarikev.png" alt="User" />
        <AvatarFallback>EL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>EL</AvatarFallback>
      </Avatar>
    </div>
  )
}
