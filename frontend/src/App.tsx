import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Root from './routes/root'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
