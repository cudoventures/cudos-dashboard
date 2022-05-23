import React from 'react'
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import ArrowIcon from '../../assets/vectors/arrow-down-blue.svg'

const Dropdown = () => {
  const [age, setAge] = React.useState('10')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  const dropdownArrow = () => {
    return (
      <img
        style={{
          cursor: 'pointer'
        }}
        src={ArrowIcon}
        alt="Arrow"
      />
    )
  }

  return (
    <div>
      <FormControl
        variant="standard"
        sx={{
          width: '100%',
          height: '52px',
          padding: '10px 20px 10px 20px',
          borderRadius: '5px',
          background: '#28314E'
        }}
      >
        <Select
          IconComponent={() => dropdownArrow()}
          value={age}
          sx={{
            cursor: 'pointer'
          }}
          disableUnderline
          onChange={handleChange}
          displayEmpty
          inputProps={{
            'aria-label': 'Without label'
          }}
        >
          <MenuItem value={10}>Text Proposal</MenuItem>
          <MenuItem value={20}>Software update proposal</MenuItem>
          <MenuItem value={30}>Cancel software update proposal</MenuItem>
          <MenuItem value={40}>Parameter change proposal</MenuItem>
          <MenuItem value={50}>Community pool spend proposal</MenuItem>
          <MenuItem value={60}>Update client proposal</MenuItem>
          <MenuItem value={70}>IBC upgrade proposal</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default Dropdown
