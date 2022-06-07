import React from 'react'
import * as R from 'ramda'
import { usePagination } from 'hooks'
import Table from 'components/Table'
import { Box, CircularProgress, Typography } from '@mui/material'
import { formatNumber } from 'utils/format_token'
import moment from 'moment'
import { UnbondingsType, UnbondingType } from '../../types'
import { delegationsColumns } from '../../utils'
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
      <Typography
        color="primary.main"
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
    ),
    amount: `${formatNumber(
      item.entries[0].amount.value,
      item.entries[0].amount.exponent
    )} ${item.entries[0].amount.displayDenom.toUpperCase()}`,
    completionTime: moment(
      moment(item.entries[0].completionTime).parseZone().toLocaleString()
    )
      .format('DD MMM YYYY LTS')
      .toLocaleString()
  }))

  let component = null

  if (unbondings.loading) {
    component = (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="primary" variant="indeterminate" />
      </Box>
    )
  } else if (!items.length) {
    component = <NoData />
  } else {
    component = (
      <Table
        items={items}
        columns={delegationsColumns}
        pagination={pagination}
      />
    )
  }

  return component
}

export default Unbondings
