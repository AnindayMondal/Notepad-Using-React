import { Route, Routes } from 'react-router'
import Notepad from './pages/Notepad/Notepad'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Notepad/>}/>
    </Routes>
    </>
  )
}

export default App