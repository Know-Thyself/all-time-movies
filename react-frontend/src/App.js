import { useEffect, useState } from 'react'
import './App.css'
import Movies from './components/movies'
import MultipleSelectCheckmarksFilter from './components/filter'
import SearchBar from './components/search'

function App() {
	const [movies, setMovies] = useState([])
	const [backUpData, setBackUpData] = useState([])
	const [isSearching, setIsSearching] = useState(false)

	useEffect(() => {
		fetch('/movies')
			.then(res => res.json())
			.then(data => {
				setMovies(data)
				setBackUpData(data)
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<div className='App'>
			<h1 className='heading'>The 100 Best Movies of All Time</h1>
			<div className='filters'>
				<SearchBar
					movies={movies}
					setMovies={setMovies}
					backUpData={backUpData}
					isSearching={isSearching}
					setIsSearching={setIsSearching}
				/>
				<MultipleSelectCheckmarksFilter
					movies={movies}
					setMovies={setMovies}
					backUpData={backUpData}
					isSearching={isSearching}
				/>
			</div>
			<Movies movies={movies} />
		</div>
	)
}

export default App
