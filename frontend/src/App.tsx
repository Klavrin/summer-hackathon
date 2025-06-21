import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

const App = () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center bg-neutral-200">
      <div className="w-[720px]">
        <Input placeholder="Enter YouTube video URL..." className="h-10 bg-white" />
        <Button className="mt-2">Analyze Video</Button>
      </div>
    </div>
  )
}

export default App
