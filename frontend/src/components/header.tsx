import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Header = () => {
  return (
    <header className="bg-neutral-200 flex justify-end items-center p-2">
      <Avatar className="w-[35px] h-[35px] hover:outline-4 cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>Brinza Vasile</AvatarFallback>
      </Avatar>
    </header>
  )
}

export default Header
