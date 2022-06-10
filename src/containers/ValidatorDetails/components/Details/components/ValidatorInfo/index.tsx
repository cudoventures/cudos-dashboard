import { Box, Typography, Button, Stack, Chip } from '@mui/material'
import {
  OpenInNewRounded as OpenInNewRoundedIcon,
  ArrowUpwardRounded as ArrowUpwardRoundedIcon
} from '@mui/icons-material'

import CopyIcon from 'assets/vectors/copy-icon.svg'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import Condition from 'components/Condition'
import moment from 'moment'
import Card from 'components/Card'
import numeral from 'numeral'
import { getValidatorConditionClass } from 'utils/get_validator_condition'
import { copyToClipboard } from 'utils/projectUtils'
import { OverviewType, StatusType } from '../../types'
import { getValidatorStatus, getCondition } from './utils'

type InfoProps = {
  overview: OverviewType
  status: StatusType
}

const ValidatorInfo: React.FC<InfoProps> = ({ overview, status }) => {
  const statusTheme = getValidatorStatus(
    status.status,
    status.jailed,
    status.tombstoned
  )
  const condition = getCondition(status.condition, status.status)
  const conditionColor =
    status.status === 3 ? getValidatorConditionClass(status.condition) : 'grey'

  const handleCopy = (value: string) => {
    copyToClipboard(value)
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minHeight: '152px'
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            letterSpacing={1}
            fontWeight={700}
            color="text.secondary"
            textTransform="uppercase"
            fontSize="14px"
          >
            Validator info
          </Typography>
          <Button
            variant="text"
            color="primary"
            size="small"
            endIcon={<OpenInNewRoundedIcon fontSize="small" />}
            disableRipple
            onClick={() =>
              window
                .open(
                  `${import.meta.env.VITE_APP_EXPLORER_V2}/account/${
                    overview.operatorAddress
                  }`,
                  '_blank'
                )
                ?.focus()
            }
          >
            View in Explorer
          </Button>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={4}
        >
          <Stack gap={0.5}>
            <Typography
              letterSpacing={1}
              fontWeight={700}
              variant="body2"
              color="text.primary"
            >
              Self-Delegate Address
            </Typography>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              sx={{ cursor: 'pointer' }}
            >
              <Typography
                letterSpacing={1}
                fontWeight={700}
                variant="body2"
                color="text.secondary"
              >
                {getMiddleEllipsis(overview.selfDelegateAddress, {
                  beginning: 20,
                  ending: 4
                })}
              </Typography>
              <Box onClick={() => handleCopy(overview.selfDelegateAddress)}>
                <img src={CopyIcon} alt="Copy" width="14px" />
              </Box>
            </Stack>
          </Stack>
          <Stack gap={0.5}>
            <Typography
              letterSpacing={1}
              fontWeight={700}
              variant="body2"
              color="text.primary"
            >
              Operator Address
            </Typography>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              sx={{ cursor: 'pointer' }}
            >
              <Typography
                letterSpacing={1}
                fontWeight={700}
                variant="body2"
                color="text.secondary"
              >
                {getMiddleEllipsis(overview.operatorAddress, {
                  beginning: 20,
                  ending: 4
                })}
              </Typography>
              <Box onClick={() => handleCopy(overview.operatorAddress)}>
                <img src={CopyIcon} alt="Copy" width="14px" />
              </Box>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <ArrowUpwardRoundedIcon
                fontSize="small"
                sx={{ transform: 'rotate3d(0, 0, 1, 0.125turn)' }}
              />
            }
            sx={{ marginLeft: 'auto', fontWeight: 700, letterSpacing: 1 }}
          >
            Delegate
          </Button>
        </Box>
      </Card>
      <Card
        sx={{
          display: 'flex',
          height: '97px',
          justifyContent: 'space-between'
        }}
      >
        <Stack gap={1}>
          <Typography
            fontWeight={700}
            color="text.secondary"
            textTransform="uppercase"
            variant="body2"
          >
            Commission rate
          </Typography>
          <Typography
            fontWeight={700}
            color="text.primary"
            textTransform="uppercase"
            variant="body2"
          >
            {numeral(status.commission).format('0.[00]')}%
          </Typography>
        </Stack>
        <Stack gap={1}>
          <Typography
            fontWeight={700}
            color="text.secondary"
            textTransform="uppercase"
            variant="body2"
          >
            Status
          </Typography>
          <Chip
            variant="filled"
            label={statusTheme.status.toUpperCase()}
            sx={(theme) => ({
              borderRadius: '10px',
              background:
                theme.custom.statuses[
                  statusTheme.status as keyof typeof theme.custom.statuses
                ],
              fontWeight: 700,
              letterSpacing: '2px'
            })}
          />
        </Stack>
        <Stack gap={1}>
          <Typography
            fontWeight={700}
            color="text.secondary"
            textTransform="uppercase"
            variant="body2"
          >
            Condition
          </Typography>
          <Stack direction="row" alignItems="center">
            <Condition color={conditionColor} />
            <Typography
              color="text.primary"
              fontWeight={700}
              textTransform="capitalize"
            >
              {condition}
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Typography
            fontWeight={700}
            color="text.secondary"
            textTransform="uppercase"
            variant="body2"
            alignSelf="flex-end"
          >
            Last seen
          </Typography>
          <Typography fontWeight={700} color="text.primary" variant="body2">
            {status.lastSeen &&
              moment(moment(status.lastSeen).parseZone().toLocaleString())
                .format('DD MMM YYYY LTS')
                .toLocaleString()}
          </Typography>
        </Stack>
      </Card>
    </Box>
  )
}

export default ValidatorInfo
