import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

const App = () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-[720px]">
        <Input placeholder="Enter YouTube video URL..." className="h-10" />
      </div>
    </div>
  )
}

export default App
