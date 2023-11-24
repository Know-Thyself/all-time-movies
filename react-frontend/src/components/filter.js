import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

const genres = [
	'Action and adventure',
	'Animation',
	'Comedy',
	'Drama',
	'Horror',
	'Hybrid Genre',
	'Science fiction',
	'Thrillers',
]

export default function MultipleSelectCheckmarksFilter({
	movies,
	setMovies,
	backUpData,
	isSearching,
}) {
	const [selectedGenre, setSelectedGenre] = React.useState([])

	const handleChange = event => {
		const {
			target: { value },
		} = event
		setSelectedGenre(typeof value === 'string' ? value.split(',') : value)
	}

	React.useEffect(() => {
		if (!isSearching) {
			if (selectedGenre.length) {
				const selectedMovies = []
				backUpData.forEach(movie => {
					if (selectedGenre.includes(movie.genre)) {
						selectedMovies.push(movie)
					}
				})
				setMovies(selectedMovies)
			} else {
				setMovies(backUpData)
			}
		}
	}, [selectedGenre, movies, setMovies, backUpData, isSearching])

	return (
		<div className='dropdown'>
			<FormControl sx={{ width: 300 }} size='small'>
				<InputLabel id='select-genre'>Filter by Genres</InputLabel>
				<Select
					labelId='select-genre'
					id='demo-multiple-checkbox'
					multiple
					value={selectedGenre}
					onChange={handleChange}
					input={<OutlinedInput label='Filter by Genres' />}
					renderValue={selected => selected.join(', ')}
					MenuProps={MenuProps}
				>
					{genres.map(genre => (
						<MenuItem key={genre} value={genre}>
							<Checkbox checked={selectedGenre.indexOf(genre) > -1} />
							<ListItemText primary={genre} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
