import React from 'react'
import * as R from 'ramda'
import { usePagination } from 'hooks'
import Table from 'components/Table'
import {
  Typography,
  Stack,
  Box,
  CircularProgress,
  Tooltip
} from '@mui/material'
import { formatNumber } from 'utils/format_token'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import NoData from '../NoData'
import { DelegationsType, DelegationType } from '../../types'
import { delegationsColumns } from '../../utils'

type DelegationsProps = {
  delegations: DelegationsType
  handlePageCallback: (page: number, _rowsPerPage: number) => void
} & ComponentDefault

const Delegations: React.FC<DelegationsProps> = (props) => {
  const { delegations, handlePageCallback } = props

  const { page, rowsPerPage, handleChangePage } = usePagination({
    pageChangeCallback: handlePageCallback
  })
  const pagination = {
    page,
    rowsPerPage,
    handleChangePage,
    total: delegations.count
  }

  const pageItems = R.pathOr([], ['delegations', 'data', page], props)

  const items = pageItems.map((item: DelegationType, idx: number) => ({
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
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Box>
          <img src={CudosLogo} alt="Cudos Logo" />
        </Box>
        <Typography color="text.primary">
          {formatNumber(item.amount.value, item.amount.exponent)}
        </Typography>
        <Typography>{item.amount.displayDenom.toUpperCase()}</Typography>
      </Stack>
    )
  }))

  let component = null

  if (delegations.loading) {
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
        columns={delegationsColumns}
        pagination={pagination}
      />
    )
  }

  return component
}

export default Delegations
