import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import './carousel.css'

const MultiItemsCarousel = ({ movies }) => {
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1348 },
			items: 4,
			slidesToSlide: 3,
		},
		laptop: {
			breakpoint: { max: 1323, min: 1068 },
			items: 3,
			slidesToSlide: 2,
		},
		tablet: {
			breakpoint: { max: 1067, min: 668 },
			items: 2,
			slidesToSlide: 2,
		},
		mobile: {
			breakpoint: { max: 667, min: 300 },
			items: 1,
			slidesToSlide: 1,
		},
	}

	return (
		<div className='parent'>
			<Carousel
				responsive={responsive}
				autoPlay={true}
				swipeable={true}
				draggable={true}
				showDots={true}
				infinite={true}
				partialVisible={false}
				dotListClass={'custom-dot-list-style'}
				containerClass={'carousel-container'}
			>
				{movies.map((movie, index) => {
					return (
						<div className={'slider'} key={index}>
							<h4 className='carousel-img-title'>
								{movie.rank}. {movie.title} ({movie.year})
							</h4>
							<img
								key={index}
								src={movie.image}
								alt={movie.title}
								title={movie.title}
								className='carousel-img'
							/>
						</div>
					)
				})}
			</Carousel>
		</div>
	)
}

export default MultiItemsCarousel
