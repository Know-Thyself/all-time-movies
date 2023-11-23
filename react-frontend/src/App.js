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
			<h1 className='heading'>The 100 Best Movies of All Time</h1>
			<Movies movies={movies} />
		</div>
	)
}

export default App
