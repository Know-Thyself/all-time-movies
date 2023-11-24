import { useState } from 'react'
import ReactReadMoreReadLess from 'react-read-more-read-less'

const Movies = ({ movies }) => {
	const [isExpanding, setIsExpanding] = useState(false)
	console.log(isExpanding);
	return (
		<div className='main_container' key='movies'>
			{movies.map(movie => (
				<div
					className={`movie_wrapper ${isExpanding ? 'expanding' : ''}`}
					key={movie.id}
				>
					<div className='image_wrapper' key={movie.id}>
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
								<span className='genre'>{movie.genre}</span>
							</figcaption>
						</figure>
					</div>
					<div className='summary' onClick={() => setIsExpanding(!isExpanding)}>
						<ReactReadMoreReadLess
							charLimit={180}
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
