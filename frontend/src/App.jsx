import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Result from './Pages/Result'
import ByCredit from './Pages/ByCredit'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'


const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<ByCredit/>}/>
        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App