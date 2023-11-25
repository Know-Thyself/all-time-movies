import { useEffect, useState } from 'react'
import MultiItemsCarousel from '../components/carousel/carousel'
import SearchBar from '../components/search'
import MultipleSelectCheckmarksFilter from '../components/filter'
import Movies from '../components/movies'
import '../App.css'

const Home = () => {
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
		<div>
			<MultiItemsCarousel movies={movies} />
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

export default Home
