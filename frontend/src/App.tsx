<<<<<<< HEAD
import UrlInputPage from './components/UrlInputPage'
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Root from './routes/root'
>>>>>>> f203423e5200afa252da67f31cc894c8c4125eef

export default function App() {
  return (
<<<<<<< HEAD
    <UrlInputPage />
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}></Route>
      </Routes>
    </BrowserRouter>
>>>>>>> f203423e5200afa252da67f31cc894c8c4125eef
  )
}
