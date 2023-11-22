import logo from './logo.svg'
import { useEffect, useState } from 'react'
import './App.css'
import Movies from './components/movies'

function App() {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		fetch('/movies')
			.then((res) => res.json())
			.then((data) => setMovies(data))
			.catch((err) => console.log(err, '<-------err'))
	}, [])
	return (
		<div className='App'>
			<h1 className='heading'>100 All Time Movies</h1>
			<Movies movies={movies} />
		</div>
	)
}

export default App
