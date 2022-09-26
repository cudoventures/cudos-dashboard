import { Typography, Box, Button, Stack, Tooltip } from '@mui/material'
import { initialUndelegationModalState, UnbondingModalProps } from 'store/modal'
import { useSelector } from 'react-redux'
import Table from 'components/Table'
import { RootState } from 'store'
import { useNavigate } from 'react-router-dom'
import { CancelRoundedIcon } from 'components/Dialog/components/styles'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import CudosLogo from 'assets/vectors/cudos-logo.svg'
import { unbondingsColumns } from 'containers/ValidatorDetails/components/Delegators/utils'
import AvatarName from 'components/AvatarName'
import { formatBigNum, formatDateTime } from 'utils/projectUtils'
import BigNumber from 'bignumber.js'
import { formatNumber } from 'utils/format_token'
import { ModalContainer } from './styles'

type UnbondingProps = {
  modalProps: UnbondingModalProps
  handleModal: (modalProps: Partial<UnbondingModalProps>) => void
}

const UnbondingModal: React.FC<UnbondingProps> = ({
  modalProps,
  handleModal
}) => {
  const { undelegations } = useSelector(({ profile }: RootState) => profile)
  const validators = useSelector(({ validator }: RootState) => validator.items)
  const navigate = useNavigate()

  const handleClose = () => {
    handleModal({
      ...initialUndelegationModalState
    })
  }

  const generateKey = (validatorAddress: string) => {
    return validatorAddress + Math.floor(Math.random() * 1000) + 1
  }

  const getValidatorName = (validatorAddress: string) => {
    const result = validators.filter(
      (validator) =>
        validator.validator === validatorAddress && {
          moniker: validator.moniker,
          url: validator.avatarUrl
        }
    )

    return { result }
  }

  const formattedUnbondings = undelegations.map((undelegation, idx) => ({
    idx: idx + 1,
    validator: (
      <Tooltip
        title={
          getValidatorName(undelegation.validatorAddress).result[0].moniker
        }
      >
        <Box
          onClick={() => {
            navigate(`/staking/${undelegation.validatorAddress}`)
            handleClose()
          }}
        >
          <AvatarName
            name={
              getValidatorName(undelegation.validatorAddress).result[0].moniker
            }
            imageUrl={
              getValidatorName(undelegation.validatorAddress).result[0]
                .avatarUrl
            }
            address={undelegation.validatorAddress}
          />
        </Box>
      </Tooltip>
    ),
    amount: (
      <Stack gap={1} alignItems="flex-start">
        {undelegation.amount.map((entry) => (
          <Stack
            key={generateKey(undelegation.validatorAddress)}
            direction="row"
            gap={1}
          >
            <Box sx={{ display: 'flex', alignSelf: 'center' }}>
              <img src={CudosLogo} alt="Cudos Logo" />
            </Box>
            <Typography color="text.primary">
              {formatNumber(formatBigNum(new BigNumber(entry)), 2)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    ),
    completionTime: (
      <Stack gap={1} alignItems="flex-start">
        {undelegation.completionTime.map((time: any) => (
          <Stack
            key={generateKey(undelegation.validatorAddress)}
            direction="row"
            alignItems="center"
            gap={1}
          >
            <AccessTimeRoundedIcon color="primary" />
            <Typography fontSize={12} color="text.secondary">
              {formatDateTime(time)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    )
  }))

  return (
    <ModalContainer>
      <Typography variant="h5" fontWeight={900} textAlign="center">
        Unbonding CUDOS
      </Typography>
      <Box
        sx={{ maxHeight: '400px' }}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <CancelRoundedIcon onClick={handleClose} />
        <Table items={formattedUnbondings} columns={unbondingsColumns} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={() => ({
          width: '35%'
        })}
        onClick={handleClose}
      >
        Close
      </Button>
    </ModalContainer>
  )
}

export default UnbondingModal
