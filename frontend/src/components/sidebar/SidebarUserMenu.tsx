import { LogOut, User, Key } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/contexts/AuthContext"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/common/UserAvatar"

export default function SidebarUserMenu({ isCollapsed }: { isCollapsed: boolean }) {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()

  if (!user) return null

  return (
    <div className="border-t">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={
              "flex items-center gap-2 transition-[width,height,padding] " +
              (isCollapsed
                ? "size-8 p-2 justify-center"
                : "w-full justify-start px-2")
            }
          >
            <UserAvatar
              name={user.name}
              avatar={user.avatar}
              size={32}
            />
            {!isCollapsed && (
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium leading-none">
                  {user.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.role}
                </span>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          align="start"
          className="w-48"
        >
          <DropdownMenuItem
            onClick={() =>
              navigate(
                user.role === "admin"
                  ? "/admin/settings"
                  : "/employee/profile"
              )
            }
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              navigate(
                user.role === "admin"
                  ? "/admin/settings"
                  : "/employee/settings"
              )
            }
          >
            <Key className="mr-2 h-4 w-4" />
            Change Password
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => {
              logout()
              navigate("/login")
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
