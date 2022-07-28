import { TableCell, styled } from '@mui/material'

export const styles: SxMap = {
  activityContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 2,
    overflow: 'hidden'
  }
}

export const StyledTableCell = styled(TableCell)(() => ({
  padding: '8px 0',
  paddingRight: '4px'
}))
