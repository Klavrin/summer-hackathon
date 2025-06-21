import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Root from './routes/root'
import Header from './components/header'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Root />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
