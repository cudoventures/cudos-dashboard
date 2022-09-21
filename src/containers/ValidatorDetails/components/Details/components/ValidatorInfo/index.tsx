import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Collapse,
  Tooltip
} from '@mui/material'
import {
  OpenInNewRounded as OpenInNewRoundedIcon,
  ArrowUpwardRounded as ArrowUpwardRoundedIcon,
  KeyboardArrowDownRounded as KeyboardArrowDownRoundedIcon
} from '@mui/icons-material'
import CopyIcon from 'assets/vectors/copy-icon.svg'
import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import Condition from 'components/Condition'
import moment from 'moment'
import Card from 'components/Card'
import numeral from 'numeral'
import { getValidatorConditionClass } from 'utils/get_validator_condition'
import { copyToClipboard } from 'utils/projectUtils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { updateNotifications } from 'store/notifications'
import DelegationModal from 'components/Dialog/components/DelegationModal'
import useDelegationModal from 'components/Dialog/components/DelegationModal/hooks'
import { ModalStatus } from 'store/modal'
import { OverviewType, StatusType } from '../../types'
import { getValidatorStatus, getCondition } from './utils'
import useValidators from '../../../../../Staking/components/Validators/components/Table/hooks'
import RedelegationModal from './components/RedelegationModal'
import useRedelegationModal from './components/RedelegationModal/hooks'
import UndelegationModal from './components/UndelegationModal'
import useUndelegationModal from './components/UndelegationModal/hooks'

type InfoProps = {
  overview: OverviewType
  status: StatusType
}

const ValidatorInfo: React.FC<InfoProps> = ({ overview, status }) => {
  const [openActionsDropdown, setOpenActionsDropdown] = useState<boolean>(false)
  const info = useSelector((state: RootState) => state.notifications.info)
  const dispatch = useDispatch()
  const { state } = useValidators()
  const { handleModal: handleDelegationModal } = useDelegationModal()
  const { handleModal: handleRedelegationModal } = useRedelegationModal()
  const { handleModal: handleUndelegationModal } = useUndelegationModal()

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

    dispatch(updateNotifications({ info: 'Copied' }))

    setTimeout(() => {
      dispatch(updateNotifications({ info: '' }))
    }, 5000)
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
                  `${import.meta.env.VITE_APP_EXPLORER_V2}/validators/${
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
              <Tooltip title={info || 'Copy'} placement="bottom">
                <Box onClick={() => handleCopy(overview.selfDelegateAddress)}>
                  <img src={CopyIcon} alt="Copy" width="14px" />
                </Box>
              </Tooltip>
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
              <Tooltip title={info || 'Copy'} placement="bottom">
                <Box onClick={() => handleCopy(overview.operatorAddress)}>
                  <img src={CopyIcon} alt="Copy" width="14px" />
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
          <Box
            sx={{
              position: 'relative',
              marginLeft: 'auto',
              width: '200px'
            }}
            onMouseLeave={() => setOpenActionsDropdown(false)}
          >
            <Button
              variant="contained"
              color={openActionsDropdown ? 'secondary' : 'primary'}
              fullWidth
              endIcon={
                <KeyboardArrowDownRoundedIcon
                  fontSize="small"
                  sx={{
                    transition: 'all 0.5s',
                    transform: openActionsDropdown
                      ? `rotate3d(1, 0, 0, 0.5turn)`
                      : null
                  }}
                />
              }
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                justifyContent: 'space-between',
                zIndex: 3
              }}
              onMouseEnter={() => setOpenActionsDropdown(!openActionsDropdown)}
            >
              Actions
            </Button>
            <Collapse
              sx={({ custom }) => ({
                position: 'absolute',
                top: '23px',
                width: '100%',
                background: custom.backgrounds.light,
                fontSize: '14px',
                borderRadius: '0px 0px 20px 20px',
                boxShadow: '2px 10px 20px rgba(2, 6, 20, 0.6)',
                zIndex: 2
              })}
              in={openActionsDropdown}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  marginTop: '1rem',
                  padding: '1rem'
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: 700 }}
                  startIcon={
                    <ArrowUpwardRoundedIcon
                      fontSize="small"
                      sx={{ transform: 'rotate3d(0, 0, 1, 0.125turn)' }}
                    />
                  }
                  onClick={() =>
                    handleDelegationModal({
                      open: true,
                      status: ModalStatus.IN_PROGRESS,
                      validator: {
                        name: overview.moniker,
                        imageUrl: overview.avatarUrl,
                        address: overview.operatorAddress
                      },
                      amount: null,
                      fee: '',
                      gasUsed: 0,
                      txHash: ''
                    })
                  }
                >
                  Delegate
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: 700 }}
                  startIcon={
                    <ArrowUpwardRoundedIcon
                      fontSize="small"
                      sx={{ transform: 'rotate3d(0, 0, 1, 0.125turn)' }}
                    />
                  }
                  onClick={() =>
                    handleRedelegationModal({
                      open: true,
                      status: ModalStatus.IN_PROGRESS,
                      validator: {
                        name: overview.moniker,
                        imageUrl: overview.avatarUrl,
                        address: overview.operatorAddress
                      },
                      amount: null,
                      fee: '',
                      gasUsed: 0,
                      txHash: ''
                    })
                  }
                >
                  Redelegate
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: 700 }}
                  startIcon={
                    <ArrowUpwardRoundedIcon
                      fontSize="small"
                      sx={{ transform: 'rotate3d(0, 0, 1, 0.625turn)' }}
                    />
                  }
                  onClick={() =>
                    handleUndelegationModal({
                      open: true,
                      status: ModalStatus.IN_PROGRESS,
                      validator: {
                        name: overview.moniker,
                        imageUrl: overview.avatarUrl,
                        address: overview.operatorAddress
                      },
                      amount: null,
                      fee: '',
                      gasUsed: 0,
                      txHash: ''
                    })
                  }
                >
                  Undelegate
                </Button>
              </Box>
            </Collapse>
          </Box>
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
          <Stack direction="row" alignItems="center" gap={1}>
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
              moment(
                new Date(moment(status.lastSeen).parseZone().toLocaleString())
              )
                .format('DD MMM YYYY LTS')
                .toLocaleString()}
          </Typography>
        </Stack>
      </Card>
      <DelegationModal />
      <UndelegationModal />
      <RedelegationModal />
    </Box>
  )
}

export default ValidatorInfo
