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
	'Hybrid Genre Film',
	'Science fiction',
	'Thrillers',
]

export default function MultipleSelectCheckmarksFilter({
	movies,
	setMovies,
	backUpData,
}) {
	const [selectedGenre, setSelectedGenre] = React.useState([])

	const handleChange = event => {
		const {
			target: { value },
		} = event
		setSelectedGenre(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		)
	}

	React.useEffect(() => {
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
	}, [selectedGenre, movies, setMovies, backUpData])

	return (
		<div className='dropdown'>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id='demo-multiple-checkbox-label'>
					Filter by Genres
				</InputLabel>
				<Select
					labelId='demo-multiple-checkbox-label'
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
