import { BrowserRouter } from 'react-router'
import AppRouter from './routes/AppRouter'
import "./api/axiosMain"

function App() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
