import {
	BrowserRouter,
	Routes,
	Route,
	Link,
} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Home from './pages/home'
import './App.css'
import MovieDetail from './pages/detail'
import { useState } from 'react'

function App() {
	const [isHome, setIsHome] = useState(true)
	return (
		<div className='App'>
			<BrowserRouter>
				<div className='nav-bar'>
					<div className={`${isHome ? 'heading-home' : 'heading-detail'}`}>
						<p className='heading'>100 Best Movies of All Time</p>
						<Link
							className={`${isHome ? 'd-none' : 'back-link'}`}
							to={'/'}
							onClick={() => setIsHome(true)}
						>
							<ArrowBackIcon/> Back
						</Link>
					</div>
				</div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/:title'
						element={<MovieDetail setIsHome={setIsHome} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
