const Movies = ({ movies }) => {
	return (
		<div className='main_container' key='movies'>
			{movies.map(movie => (
				<div className='movie_wrapper' key={movie.id}>
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
					<p className='summary'>{movie.summary}</p>
				</div>
			))}
		</div>
	)
}

export default Movies
