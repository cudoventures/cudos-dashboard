import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Box, Collapse, Button, Tooltip } from '@mui/material'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import { updateUser } from 'store/profile'
import { copyToClipboard, formatAddress } from 'utils/projectUtils'
import KeplrLogo from 'assets/vectors/keplr-logo.svg'
import CosmostationLogo from 'assets/vectors/cosmostation-logo.svg'
import LinkIcon from 'assets/vectors/link-icon.svg'
import CopyIcon from 'assets/vectors/copy-icon.svg'
import ArrowIcon from 'assets/vectors/arrow-down.svg'

import getMiddleEllipsis from 'utils/get_middle_ellipsis'
import { styles } from './styles'

const UserInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { address, accountName, connectedLedger } = useSelector(
    (state: RootState) => state.profile
  )

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = (value: string) => {
    copyToClipboard(value)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const handleExplorer = () => {
    window.open(`${import.meta.env.VITE_APP_EXPLORER_V2?.toString()}`, '_blank')
  }

  const handleDisconnect = () => {
    dispatch(
      updateUser({
        address: '',
        accountName: '',
        lastLoggedAddress: address,
        balance: new BigNumber(0),
        availableRewards: new BigNumber(0),
        stakedValidators: [],
        stakedBalance: new BigNumber(0),
        delegations: [],
        redelegations: [],
        undelegations: [],
        connectedLedger: ''
      })
    )
    navigate('/')
  }

  return (
    <Box sx={styles.user} onMouseLeave={() => setOpen(false)}>
      <Box onMouseEnter={() => setOpen(true)} sx={styles.userContainer}>
        <Box sx={styles.userInnerContainer}>
          <Box>
            <img
              src={connectedLedger === 'Keplr' ? KeplrLogo : CosmostationLogo}
              alt="Logo"
              style={{ position: 'absolute', left: 15, top: 12 }}
            />
          </Box>
          <Typography variant="body2">
            Hi,
            <Typography component="span" variant="body2" fontWeight={700}>
              {` ${getMiddleEllipsis(accountName, {
                beginning: 8,
                ending: 4
              })}`}
            </Typography>
          </Typography>
          <Box>
            <img
              style={{
                cursor: 'pointer',
                transform: open ? 'rotate(180deg)' : 'rotate(360deg)',
                position: 'absolute',
                right: 15,
                top: 20
              }}
              src={ArrowIcon}
              alt="Arrow Icon"
            />
          </Box>
        </Box>
      </Box>
      <Collapse sx={{ position: 'absolute', top: 21, zIndex: '-1' }} in={open}>
        <Box sx={styles.dropdownMenuContainer}>
          <Box sx={{ marginTop: '40px' }}>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  marginTop: '10px'
                }}
              >
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: '12px', marginBottom: '10px' }}
                >
                  {formatAddress(address, 20)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip
                onClick={() => handleCopy(address)}
                title={copied ? 'Copied' : 'Copy to clipboard'}
              >
                <img
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  src={CopyIcon}
                  alt="Copy"
                />
              </Tooltip>
              <Tooltip onClick={() => handleExplorer()} title="Go to Explorer">
                <img
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  src={LinkIcon}
                  alt="Link"
                />
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px'
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDisconnect()}
              >
                Disconnect
              </Button>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default UserInfo
