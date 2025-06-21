import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import { YoutubeTranscript } from 'youtube-transcript'

const App = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    YoutubeTranscript.fetchTranscript('').then((d: any) => setData(d))
  }, [])

  return <div>{data}</div>
}

export default App
