import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Root = () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center bg-neutral-200 px-8">
      <div className="w-[720px] flex gap-2">
        <Input placeholder="Enter YouTube video URL..." className="h-10 bg-white" />
        <Button className="h-10">Analyze Video</Button>
      </div>
    </div>
  )
}

export default Root
