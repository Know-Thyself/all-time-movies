import { useLocation } from 'react-router-dom'

const MovieDetail = () => {
	const { state } = useLocation()
	return <div>{state.movie.title}</div>
}

export default MovieDetail
