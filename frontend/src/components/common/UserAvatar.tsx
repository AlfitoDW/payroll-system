import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

type Props = {
  name: string
  avatar?: string | null
  size?: number
}

export default function UserAvatar({
  name,
  avatar,
  size = 32,
}: Props) {
  return (
    <Avatar style={{ width: size, height: size }}>
      <AvatarImage
        src={avatar || undefined} 
        alt={name}
      />
      <AvatarFallback>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
