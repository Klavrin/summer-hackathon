const getTranscript = async (req, res) => {
  const { youtubeUrl } = req.body

  if (!youtubeUrl) {
    return res.status(400).json({ error: 'youtubeUrl is required' })
  }

  try {
    // get transcript from python
    //   res.json({
    //       transcript: // transcript from python goes here
    //   })
  } catch (err) {
    console.error('Error fetching transcript:', err.message)
    res.status(500).json({
      error:
        'Failed to fetch transcript. Maybe captions are disabled or video ID is invalid.'
    })
  }
}

// module.exports = getTranscript

export default getTranscript
