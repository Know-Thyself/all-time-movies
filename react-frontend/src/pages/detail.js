import { useLocation } from 'react-router-dom'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import { useEffect, useState } from 'react'

const MovieDetail = ({ setIsHome }) => {
	setIsHome(false)
	const { state } = useLocation()
	const movie = state.movie
	const id = state.id
	const [movieDetail, setMovieDetail] = useState({})
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
								<strong>Genre:</strong> {movie.genre}
							</span>
						</figcaption>
					</figure>
				</div>
				<div className='detail-summary'>
					<strong>Summary: </strong>
					<ReactReadMoreReadLess
						charLimit={320}
						readMoreText={'Read more ▼'}
						readLessText={'Read less ▲'}
					>
						{movie.summary}
					</ReactReadMoreReadLess>
				</div>
				{movieDetail.timeout_says && (
					<di>
						<h3>Timeout Says</h3>
						<p>{movieDetail.timeout_says}</p>
					</di>
				)}
			</div>
		</div>
	)
}

export default MovieDetail
