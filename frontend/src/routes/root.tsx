import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Toggle } from '../components/ui/toggle'

const Root = () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center px-8">
      <div className="w-[720px]">
        <div className="flex flex-col gap-2 border-1 p-2 rounded-2xl shadow-sm">
          <Input
            placeholder="Enter YouTube video URL..."
            className="h-10 bg-white shadow-none border-none outline-none"
          />
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Toggle aria-label="Toggle italic" className="border-1">
                Quiz
              </Toggle>
              <Toggle aria-label="Toggle italic" className="border-1">
                Flashcards
              </Toggle>
              <Toggle aria-label="Toggle italic" className="border-1">
                Practice Problems
              </Toggle>
            </div>
            <Button className="h-10">Analyze Video</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Root
