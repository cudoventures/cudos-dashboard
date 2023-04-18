import React from 'react'
import * as R from 'ramda'
import { usePagination } from 'hooks'
import Table from 'components/Table'
import {
  Box,
  CircularProgress,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import { formatNumber } from 'utils/format_token'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import moment from 'moment'
import NoData from 'components/NoData'
import { RedelegationsType, RedelegationType } from '../../types'
import { redelegationsColumns } from '../../utils'
import { CHAIN_DETAILS } from 'utils/constants'

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
                `${CHAIN_DETAILS.EXPLORER_URL}/accounts/${
                  item.address
                }`,
                '_blank'
              )
              ?.focus()
          }
        >
          {getMiddleEllipsis(item.address, {
            beginning: 20,
            ending: 4
          })}
        </Typography>
      </Tooltip>
    ),
    to: (
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
                `${CHAIN_DETAILS.EXPLORER_URL}/validators/${item.to}`,
                '_blank'
              )
              ?.focus()
          }
        >
          {getMiddleEllipsis(item.to, {
            beginning: 20,
            ending: 4
          })}
        </Typography>
      </Tooltip>
    ),
    amount: (
      <Stack gap={1} alignItems="flex-start">
        {item.entries.map((entry) => (
          <Stack key={entry.completionTime} direction="row" gap={1}>
            <Box>
              <img src={CudosLogo} alt="Cudos Logo" />
            </Box>
            <Typography color="text.primary">
              {formatNumber(entry.amount.value, entry.amount.exponent)}
            </Typography>
            <Typography>{entry.amount.displayDenom.toUpperCase()}</Typography>
          </Stack>
        ))}
      </Stack>
    ),
    completionTime: (
      <Stack gap={1} alignItems="flex-start">
        {item.entries.map((entry) => (
          <Stack key={entry.completionTime} direction="row" gap={1}>
            <AccessTimeRoundedIcon color="primary" />
            <Typography fontSize={12} color="text.secondary">
              {moment(
                new Date(
                  moment(entry.completionTime).parseZone().toLocaleString()
                )
              )
                .format('DD MMM YYYY LTS')
                .toLocaleString()}
            </Typography>
          </Stack>
        ))}
      </Stack>
    )
  }))

  let component = null

  if (redelegations.loading) {
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
        columns={redelegationsColumns}
        pagination={pagination}
      />
    )
  }

  return component
}

export default Redelegations
