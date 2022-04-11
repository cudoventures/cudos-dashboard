import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import { Column } from './types'

type ValidatorsTableProps = {
  items: []
  columns: Column[]
  sortKey: string
  handleSort: (key: string) => void
  sortDirection: 'desc' | 'asc'
}

const ValidatorsTable: React.FC<ValidatorsTableProps> = ({
  items,
  columns,
  sortKey,
  handleSort,
  sortDirection
}) => {
  return (
    <>
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                width={col.width}
                colSpan={col.colSpan}
                align={col.align}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={col.align}
                  gap={1}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    {col.label}
                  </Typography>
                  {col.sortKey &&
                    (col.sortKey === sortKey ? (
                      <ArrowDownwardRoundedIcon
                        sx={(theme) => ({
                          fontSize: '1rem',
                          cursor: 'pointer',
                          color:
                            col.sortKey === sortKey
                              ? theme.palette.primary.main
                              : theme.palette.text.primary,
                          transition: 'all 0.3s',
                          transform:
                            sortDirection === 'asc'
                              ? 'rotate3d(1, 0, 0, 0.5turn)'
                              : null
                        })}
                        onClick={() =>
                          col.sortKey ? handleSort(col?.sortKey) : null
                        }
                      />
                    ) : (
                      <ArrowDownwardRoundedIcon
                        sx={(theme) => ({
                          fontSize: '1rem',
                          cursor: 'pointer',
                          color:
                            col.sortKey === sortKey
                              ? theme.palette.primary.main
                              : theme.palette.text.primary,
                          transition: 'all 0.3s'
                        })}
                        onClick={() =>
                          col.sortKey ? handleSort(col?.sortKey) : null
                        }
                      />
                    ))}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
      <Box sx={{ height: '100%', overflow: 'auto', width: '100%' }}>
        <Table sx={{ tableLayout: 'fixed' }}>
          <TableBody>
            {items.map((item: any) => (
              <TableRow key={item.idx}>
                {columns.map((col: any) => (
                  <TableCell
                    key={col.key}
                    width={col.width}
                    colSpan={col.colSpan}
                    align={col.align}
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      color={col.color || 'text.secondary'}
                      fontWeight={600}
                    >
                      {item[col.key]}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  )
}

export default ValidatorsTable
