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
    <header className="flex justify-between items-center p-2 fixed w-screen">
      <Select defaultValue="free">
        <SelectTrigger className="w-[180px] shadow-none text-xl border-none hover:bg-neutral-200">
          <SelectValue placeholder="Free Plan" />
        </SelectTrigger>
        <SelectContent defaultValue="free">
          <SelectItem value="free">Free Plan</SelectItem>
          <SelectItem value="plus">Plus Plan</SelectItem>
          <SelectItem value="premium">Premium Plan</SelectItem>
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
