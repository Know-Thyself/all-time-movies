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
								<tr className='cast'>
									<th>Cast:</th>
									<div className='cast'>
										{movieDetail.Cast.map(cast => (
											<td>{cast}</td>
										))}
									</div>
								</tr>
							</table>
						</div>
					)}
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
					{movieDetail.timeout_says && (
						<di>
							<h3>Timeout Says</h3>
							<p>{movieDetail.timeout_says}</p>
							<p>{movieDetail.author}</p>
							<p>{movieDetail.time}</p>
						</di>
					)}
				</div>
			</div>
		</div>
	)
}

export default MovieDetail
