import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

const Header = () => {
  return (
    <header className="bg-neutral-200 flex justify-end items-center p-2">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <Avatar className="w-[35px] h-[35px] hover:outline-4 cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>Brinza Vasile</AvatarFallback>
      </Avatar>
    </header>
  )
}

export default Header
