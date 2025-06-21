import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Root = () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center px-8">
      <div className="w-[720px]">
        <div className="flex flex-col gap-2 border-1 p-4 rounded-2xl">
          <Input
            placeholder="Enter YouTube video URL..."
            className="h-10 bg-white shadow-none border-none outline-none"
          />
          <div>
            <Button className="h-10">Analyze Video</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Root
