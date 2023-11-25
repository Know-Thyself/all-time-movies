import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import './App.css'
import MovieDetail from './pages/detail'

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<h1 className='heading'>The 100 Best Movies of All Time</h1>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/detail' element={<MovieDetail/>} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
