import { useEffect, useState } from 'react'
import './App.css'
import Movies from './components/movies'
import MultipleSelectCheckmarksFilter from './components/filter'

function App() {
	const [movies, setMovies] = useState([])
	const [backUpData, setBackUpData] = useState([])

	useEffect(() => {
		fetch('/movies')
			.then((res) => res.json())
			.then((data) => {
				setMovies(data)
				setBackUpData(data)
			})
			.catch((err) => console.log(err, '<-------err'))
	}, [])
	return (
		<div className='App'>
			<h1 className='heading'>The 100 Best Movies of All Time</h1>
			<MultipleSelectCheckmarksFilter movies={movies} setMovies={setMovies} backUpData={backUpData} />
			<Movies movies={movies} />
		</div>
	)
}

export default App
