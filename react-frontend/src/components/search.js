import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'

const SearchBar = ({
	movies,
	setMovies,
	backUpData,
	isSearching,
	setIsSearching,
}) => {
	const [searchInput, setSearchInput] = useState('')
	const [shrink, setShrink] = useState(false)

	const handleSearch = e => {
		e.preventDefault()
		setSearchInput(e.target.value)
		setIsSearching(true)
	}

	useEffect(() => {
		if (isSearching) {
			if (searchInput) {
				let searchResult = movies.filter(movie => {
					return movie.title.toLowerCase().includes(searchInput.toLowerCase())
				})
				console.log(searchResult)
				setMovies(searchResult)
			} else if (searchInput === '') {
				setMovies(backUpData)
				setIsSearching(false)
			}
		}
	}, [movies, searchInput, setMovies, backUpData, isSearching, setIsSearching])

	return (
		<Box
			component='form'
			sx={{
				'& > :not(style)': { width: 300 },
			}}
			noValidate
			autoComplete='off'
			className='search'
		>
			<TextField
				id='search'
				label='Search'
				variant='outlined'
				onChange={handleSearch}
				size='small'
				hiddenLabel
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<SearchIcon />
						</InputAdornment>
					),
				}}
				onFocus={() => setShrink(true)}
				onBlur={e => setShrink(!!e.target.value)}
				InputLabelProps={{ shrink }}
				sx={{
					'& .MuiInputLabel-root': {
						paddingX: 3.5,
					},
					'& .MuiOutlinedInput-notchedOutline': {
						px: 3.5,
					},
				}}
			/>
		</Box>
	)
}

export default SearchBar
