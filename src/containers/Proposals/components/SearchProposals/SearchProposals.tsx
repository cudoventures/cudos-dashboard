import React, { useEffect, useState } from 'react'
import { InputAdornment } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateProposals } from 'store/proposals'
import SearchIcon from 'assets/vectors/search-icon.svg'
import _ from 'lodash'

import { InputContainer } from '../../styles'

const SearchProposals = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const dispatch = useDispatch()

  const handleSearch = (value: any) => {
    dispatch(updateProposals({ searchField: value }))
  }

  const delayInput = _.debounce((value) => handleSearch(value), 1000)

  useEffect(() => {
    delayInput(searchTerm)

    return () => delayInput.cancel()
  }, [searchTerm])

  return (
    <InputContainer
      sx={{ marginLeft: '50px', minWidth: '25vw' }}
      disableUnderline
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search for proposal, proposer, ID..."
      startAdornment={
        <InputAdornment position="start">
          <img style={{ marginRight: '20px' }} src={SearchIcon} alt="Search" />
        </InputAdornment>
      }
    />
  )
}

export default SearchProposals
