import {
  Box,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Typography
} from '@mui/material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { defaultMessages } from 'ledgers/utils'
import Filter from 'assets/vectors/filter.svg?component'

type ActivityHeaderProps = {
  filterByType: (type: string) => Promise<void>
  filter: string
}

const SelectInput = styled(InputBase)(({ theme }) => ({
  background: theme.custom.backgrounds.light,
  display: 'flex',
  alignItems: 'center',
  padding: '0 15px',
  '& .MuiInputBase-input': {
    borderRadius: '5px',
    position: 'relative',
    background: theme.custom.backgrounds.light,
    border: 'none',
    minWidth: '100px',
    padding: '0.5rem 1rem',
    textTransform: 'none'
  }
}))

const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  filterByType = () => null,
  filter = ''
}) => {
  const options = [
    { value: '', label: 'Show All' },
    ...Object.entries(defaultMessages).map(([key, value]: [string, any]) => ({
      value: key.split('/').pop(),
      label: value.displayName
    }))
  ]

  const handleSelect = (e: SelectChangeEvent) => {
    const newValue = e.target.value
    filterByType(newValue)
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography
        letterSpacing={1}
        fontWeight={700}
        color="text.secondary"
        textTransform="uppercase"
        fontSize="14px"
      >
        Activity
      </Typography>
      <Stack direction="row" alignItems="center" gap={2} sx={{ minWidth: 120 }}>
        {filter && (
          <Typography
            variant="body2"
            onClick={() => filterByType('')}
            sx={({ palette }) => ({
              cursor: 'pointer',
              '&:hover': {
                color: palette.primary.main
              }
            })}
          >
            Clear
          </Typography>
        )}
        <FormControl>
          <Select
            fullWidth
            IconComponent={KeyboardArrowDownRoundedIcon}
            value={filter}
            onChange={handleSelect}
            displayEmpty
            SelectDisplayProps={{
              defaultValue: ''
            }}
            size="small"
            sx={{
              width: '250px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center'
            }}
            MenuProps={{
              sx: {
                maxHeight: '300px',
                width: '250px'
              }
            }}
            input={
              <SelectInput
                startAdornment={
                  <Stack direction="row" alignItems="center" gap="15px">
                    <Filter />
                    <Box
                      sx={({ palette }) => ({
                        height: '18px',
                        border: `1px solid ${palette.text.secondary}`
                      })}
                    />
                  </Stack>
                }
              />
            }
          >
            {options.map((o) => (
              <MenuItem value={o.value} key={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  )
}

export default ActivityHeader
