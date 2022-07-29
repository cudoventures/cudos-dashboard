import React from 'react'
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box
} from '@mui/material'
import ArrowIcon from 'assets/vectors/arrow-down-blue.svg'

export type DropdownProps = Array<DropdownState>

export type DropdownState = {
  value: string
  label: any
}

const Dropdown = ({
  data,
  selectedValue
}: {
  data: DropdownProps
  selectedValue: (param: string) => void
}) => {
  const [type, setType] = React.useState('1')
  const [animate, setAnimate] = React.useState(false)

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value)
    selectedValue(event.target.value)
  }

  const dropdownArrow = () => {
    return (
      <img
        style={
          animate
            ? { transform: 'rotate(180deg)', cursor: 'pointer' }
            : { cursor: 'pointer' }
        }
        src={ArrowIcon}
        alt="Arrow"
      />
    )
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
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
          fullWidth
          onClick={() => setAnimate(!animate)}
          open={animate}
          value={type}
          sx={{
            cursor: 'pointer'
          }}
          disableUnderline
          onChange={handleChange}
          displayEmpty
          inputProps={{
            'aria-label': 'Without label'
          }}
          MenuProps={{
            PaperProps: {
              style: {
                background: 'text.secondary',
                borderRadius: '5px',
                marginTop: '17px',
                marginLeft: '5px'
              }
            }
          }}
        >
          {data.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default Dropdown
