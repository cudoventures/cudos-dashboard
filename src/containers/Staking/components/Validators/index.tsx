import { useState } from 'react'
import { Box, InputAdornment } from '@mui/material'

import DelegationModal from 'components/Dialog/components/DelegationModal'
import { StyledTextField } from 'components/Dialog/components/styles'
import SearchIcon from 'assets/vectors/search-icon.svg?component'
import Tabs from './components/Tabs'
import ValidatorsTable from './components/Table'
import ValidatorsCount from './components/Count'
import useTable from './components/Table/hooks'

const Validators = () => {
  const [filter, setFilter] = useState<string>('')
  const { handleSearch } = useTable()

  const handleInput = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilter(ev.target.value)
    handleSearch(ev.target.value)
  }

  return (
    <Box
      sx={({ custom }) => ({
        background: custom.backgrounds.primary,
        padding: '1.2rem',
        borderRadius: '1.3rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        gap: 1
      })}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        gap={2}
        alignItems="center"
      >
        <ValidatorsCount />
        <StyledTextField
          variant="standard"
          margin="dense"
          value={filter}
          onChange={handleInput}
          placeholder="Validator"
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '12px'
            },
            inputProps: {
              style: {
                padding: 0
              }
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          size="small"
          sx={{ marginRight: 'auto' }}
        />
        <Tabs />
      </Box>
      <Box
        sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column' }}
      >
        <ValidatorsTable />
      </Box>
      <DelegationModal />
    </Box>
  )
}

export default Validators
