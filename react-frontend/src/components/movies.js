import { useState } from 'react'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import { Link } from 'react-router-dom';

const Movies = ({ movies }) => {
	const [isExpanding, setIsExpanding] = useState(false)

	return (
		<div className='main_container' key='movies'>
			{movies.map(movie => (
				<div
					className={`movie_wrapper ${isExpanding ? 'expanding' : ''}`}
					key={movie.id}
				>
					<Link
						to={`/${movie.title.split(' ').join('-').toLowerCase()}`}
						state={{ movie: movie, id: movie.id }}
						className='image_wrapper'
						key={movie.id}
					>
						<h2 className='title'>
							{movie.rank}. {movie.title} ({movie.year})
						</h2>
						<figure>
							<img
								src={`/${movie.image}`}
								alt={movie.title}
								title={movie.title}
							/>
							<figcaption>
								<span className='genre'>
									<strong className='strong'>Genre: </strong>
									{movie.genre}
								</span>
							</figcaption>
						</figure>
					</Link>
					<div className='summary' onClick={() => setIsExpanding(!isExpanding)}>
						<strong className='strong'>Summary: </strong>
						<ReactReadMoreReadLess
							charLimit={140}
							readMoreText={'Read more ▼'}
							readLessText={'Read less ▲'}
						>
							{movie.summary}
						</ReactReadMoreReadLess>
					</div>
				</div>
			))}
		</div>
	)
}

export default Movies
