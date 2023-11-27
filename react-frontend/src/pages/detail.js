import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const MovieDetail = ({ setIsHome }) => {
	setIsHome(false)
	const { state } = useLocation()
	const movies = state.movies
	const movie = state.movie
	const id = state.id
	const [movieDetail, setMovieDetail] = useState({})
	const similarMovies = movies.filter(
		m => m.genre === movie.genre && m !== movie
	)
	console.log(similarMovies)

	useEffect(() => {
		fetch(`/detail/${id}`)
			.then(res => res.json())
			.then(data => setMovieDetail(data))
			.catch(err => console.log(err))
	}, [id])

	console.log(movieDetail)

	return (
		<div>
			<h1 className='detail-title'>
				{movie.rank}. {movie.title} ({movie.year})
			</h1>
			<div className={'movie-detail'} key={movie.id}>
				<div className='detail-image_wrapper' key={movie.id}>
					<figure>
						<img
							src={`/${movie.image}`}
							alt={movie.title}
							title={movie.title}
							className='detail-image'
						/>
						<figcaption>
							<span className='detail-genre'>
								<h3>Genre: {movie.genre}</h3>
							</span>
						</figcaption>
					</figure>
					<div className='detail-summary'>
						<h3>Summary </h3>
						<p>{movie.summary}</p>
						{movieDetail.timeout_says && (
							<di>
								<h3>Timeout Says</h3>
								<p>{movieDetail.timeout_says}</p>
								<p>
									{movieDetail.author}, {movieDetail.time}
								</p>
							</di>
						)}
					</div>
					{movieDetail.timeout_says && (
						<div className='more-detail'>
							<h3>Release Detail</h3>
							<table className='release-info'>
								<tr>
									<th>Rated:</th> <td>{movieDetail.Rated}</td>
								</tr>
							</table>
							<table className='release-info'>
								<tr>
									<th>Release Date:</th>
									<td>{movieDetail['Release date']}</td>
								</tr>
							</table>
							<table className='release-info'>
								<tr>
									<th>Duration:</th>
									<td>{movieDetail.Duration}</td>
								</tr>
							</table>
							<h3>{movieDetail.section_title}</h3>
							<table className='release-info'>
								<tr>
									<th>Director:</th>
									<td>{movieDetail.Director}</td>
								</tr>
							</table>
							<table className='release-info'>
								<tr>
									<th>Screenwriter:</th>
									<td>{movieDetail.Screenwriter}</td>
								</tr>
							</table>
							<table className='release-info'>
								{movieDetail.Cast.map((cast, index) => (
									<tr>
										<th className={index === 0 ? 'cast' : 'mute'}>Cast:</th>
										<td>{cast}</td>
									</tr>
								))}
							</table>
						</div>
					)}
				</div>
				<section className='similar-section'>
					<h2>Similar Genres</h2>
					{similarMovies.map(movie => (
						<Link
							to={`/${movie.title.split(' ').join('-').toLowerCase()}`}
							state={{ movies: movies, movie: movie, id: movie.id }}
							className='similar-wrapper'
						>
							<div className='similar-img-container'>
								<img
									src={movie.image}
									alt={movie.title}
									className='similar-img'
								/>
							</div>
							<h3>{movie.title}</h3>
						</Link>
					))}
				</section>
			</div>
		</div>
	)
}

export default MovieDetail
