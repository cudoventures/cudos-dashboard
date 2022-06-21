import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  Avatar,
  Box,
  Collapse,
  Button,
  Tooltip
} from '@mui/material'
import BigNumber from 'bignumber.js'
import { RootState } from 'store'
import { updateUser } from 'store/profile'
import { copyToClipboard, formatAddress } from 'utils/projectUtils'
import TestAvatar from 'assets/vectors/test-avatar-sm.svg'
import UserMenuAvatar from 'assets/vectors/test-avatar.svg'
import LinkIcon from 'assets/vectors/link-icon.svg'
import CopyIcon from 'assets/vectors/copy-icon.svg'
import ArrowIcon from 'assets/vectors/arrow-down.svg'

import { styles } from './styles'

const UserInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { address, lastLoggedAddress } = useSelector(
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
        lastLoggedAddress,
        balance: new BigNumber(0),
        availableRewards: new BigNumber(0),
        stakedValidators: [],
        stakedBalance: new BigNumber(0)
      })
    )
    navigate('/')
  }

  return (
    <Box sx={styles.user} onMouseLeave={() => setOpen(false)}>
      <Box onMouseEnter={() => setOpen(true)} sx={styles.userContainer}>
        <Box sx={styles.userInnerContainer}>
          <Box
            sx={{
              marginRight: '10px'
            }}
          >
            <Avatar
              sx={{ width: '24px', height: '24px' }}
              src={TestAvatar}
              alt="Avatar"
            />
          </Box>
          <Typography>Hi, cudos.eth</Typography>
          <Box sx={{ marginLeft: '35px' }}>
            <img
              style={{
                cursor: 'pointer',
                transform: open ? 'rotate(180deg)' : 'rotate(360deg)'
              }}
              src={ArrowIcon}
              alt="Arrow Icon"
            />
          </Box>
        </Box>
      </Box>
      <Collapse sx={{ marginTop: '-28px', zIndex: '-1' }} in={open}>
        <Box sx={styles.dropdownMenuContainer}>
          <Box sx={{ marginTop: '40px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Avatar
                sx={{ width: '36px', height: '36px' }}
                src={UserMenuAvatar}
                alt="Avatar"
              />
            </Box>
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
