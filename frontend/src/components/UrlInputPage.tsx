import React, { useState } from 'react'
import { Button } from './ui/button'

const UrlInputPage = () => {
  const [url, setUrl] = useState('')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <label htmlFor="url-input" className="text-lg font-medium">
        Enter URL link
      </label>
      <input
        id="url-input"
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="border rounded-md px-4 py-2 w-80 text-base"
      />
      <Button onClick={() => alert(`Entered URL: ${url}`)}>
        Submit
      </Button>
    </div>
  )
}

export default UrlInputPage