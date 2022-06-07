import React from 'react'
import * as R from 'ramda'
import { usePagination } from 'hooks'
import Table from 'components/Table'
import { Box, CircularProgress, Typography } from '@mui/material'
import { formatNumber } from 'utils/format_token'
import moment from 'moment'
import { RedelegationsType, RedelegationType } from '../../types'
import { delegationsColumns } from '../../utils'
import NoData from '../NoData'

type RedelegationsProps = {
  redelegations: RedelegationsType
  handlePageCallback: (page: number, _rowsPerPage: number) => void
} & ComponentDefault

const Redelegations: React.FC<RedelegationsProps> = (props) => {
  const { redelegations, handlePageCallback } = props

  const { page, rowsPerPage, handleChangePage } = usePagination({
    pageChangeCallback: handlePageCallback
  })
  const pagination = {
    page,
    rowsPerPage,
    handleChangePage,
    total: redelegations.count
  }

  const pageItems = R.pathOr([], ['redelegations', 'data', page], props)

  const items = pageItems.map((item: RedelegationType, idx: number) => ({
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
    to: (
      <Typography
        color="primary.main"
        fontWeight={700}
        variant="body2"
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          window
            .open(
              `${import.meta.env.VITE_APP_EXPLORER_V2}/validators/${item.to}`,
              '_blank'
            )
            ?.focus()
        }
      >
        {item.to}
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

  if (redelegations.loading) {
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

export default Redelegations
