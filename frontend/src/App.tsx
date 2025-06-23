import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Root from './routes/root'
import SophiraLanding from './routes/landing'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SophiraLanding />} />
        <Route path="/home" element={<Root />} />
      </Routes>
    </BrowserRouter>
  )
}
