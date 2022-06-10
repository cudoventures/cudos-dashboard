import React from 'react'
import * as R from 'ramda'
import { usePagination } from 'hooks'
import Table from 'components/Table'
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Tooltip
} from '@mui/material'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import { formatNumber } from 'utils/format_token'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import moment from 'moment'
import { UnbondingsType, UnbondingType } from '../../types'
import { unbondingsColumns } from '../../utils'
import NoData from '../NoData'

type UnbondingsProps = {
  unbondings: UnbondingsType
  handlePageCallback: (page: number, _rowsPerPage: number) => void
} & ComponentDefault

const Unbondings: React.FC<UnbondingsProps> = (props) => {
  const { unbondings, handlePageCallback } = props

  const { page, rowsPerPage, handleChangePage } = usePagination({
    pageChangeCallback: handlePageCallback
  })
  const pagination = {
    page,
    rowsPerPage,
    handleChangePage,
    total: unbondings.count
  }

  const pageItems = R.pathOr([], ['unbondings', 'data', page], props)

  const items = pageItems.map((item: UnbondingType, idx: number) => ({
    idx: idx + 1,
    delegator: (
      <Tooltip title="View in explorer" placement="right">
        <Typography
          color="primary.main"
          component="span"
          fontWeight={700}
          variant="body2"
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            window
              .open(
                `${import.meta.env.VITE_APP_EXPLORER_V2}/accounts/${
                  item.address
                }`,
                '_blank'
              )
              ?.focus()
          }
        >
          {item.address}
        </Typography>
      </Tooltip>
    ),
    amount: (
      <Stack direction="row" gap={1} alignItems="center">
        <Box>
          <img src={CudosLogo} alt="Cudos Logo" />
        </Box>
        <Typography color="text.primary">
          {formatNumber(
            item.entries[0].amount.value,
            item.entries[0].amount.exponent
          )}
        </Typography>
        <Typography>
          {item.entries[0].amount.displayDenom.toUpperCase()}
        </Typography>
      </Stack>
    ),
    completionTime: (
      <Stack direction="row" gap={1} alignItems="center">
        <AccessTimeRoundedIcon color="primary" />
        <Typography fontSize={12} color="text.secondary">
          {moment(
            moment(item.entries[0].completionTime).parseZone().toLocaleString()
          )
            .format('DD MMM YYYY LTS')
            .toLocaleString()}
        </Typography>
      </Stack>
    )
  }))

  let component = null

  if (unbondings.loading) {
    component = (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" variant="indeterminate" />
      </Box>
    )
  } else {
    component = !items.length ? (
      <NoData />
    ) : (
      <Table
        items={items}
        columns={unbondingsColumns}
        pagination={pagination}
      />
    )
  }

  return component
}

export default Unbondings
