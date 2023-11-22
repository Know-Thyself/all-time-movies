import React from 'react'

const Movies = ({ movies }) => {
	console.log(movies);
	return (
		<div className='main_container'>
			{movies.map(movie => (
				<div className='movie_wrapper'>
					<div className='image_wrapper'>
						<h2 className='title'>{movie.title}</h2>
						<figure>
							<img
								src={`/${movie.image}`}
								alt={movie.title}
								title={movie.title}
							/>
							<figcaption>{movie.year}</figcaption>
						</figure>
					</div>

					<p className='summary'>{movie.summary}</p>
				</div>
			))}
		</div>
	)
}

export default Movies
