import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { NaviiAvatar } from "@/components/ui/navii-avatar"

export function NaviiAvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <NaviiAvatar seed="alice@example.com" animated title="Alice" />
      <NaviiAvatar seed="bob@example.com" animated title="Bob" />
      <Avatar>
        <AvatarImage src="/does-not-exist.png" alt="Carol" />
        <AvatarFallback className="p-0">
          <NaviiAvatar seed="carol@example.com" size={36} title="Carol" />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
