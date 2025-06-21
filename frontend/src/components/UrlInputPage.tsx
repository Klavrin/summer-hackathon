import React, { useState } from 'react'
import styles from './UrlInputPage.module.css'

const UrlInputPage = () => {
  const [url, setUrl] = useState('')

  return (
    <div className={styles.container}>
      <label htmlFor="url-input" className={styles.label}>
        Enter URL link
      </label>
      <input
        id="url-input"
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://example.com"
        className={styles.input}
      />
      <button
        className={styles.button}
        onClick={() => alert(`Entered URL: ${url}`)}
      >
        Submit
      </button>
    </div>
  )
}

export default UrlInputPage