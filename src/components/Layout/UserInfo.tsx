import React, { useState } from 'react'
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
import { RootState } from '../../store'
import { updateUser } from '../../store/profile'
import { copyToClipboard, formatAddress } from '../../utils/projectUtils'
import { StyledUser, styles } from './styles'
import TestAvatar from '../../assets/vectors/test-avatar-sm.svg'
import UserMenuAvatar from '../../assets/vectors/test-avatar.svg'
import LinkIcon from '../../assets/vectors/link-icon.svg'
import CopyIcon from '../../assets/vectors/copy-icon.svg'
import ArrowIcon from '../../assets/vectors/arrow-down.svg'

const UserInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { address } = useSelector((state: RootState) => state.profile)

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<boolean>(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleCopy = (value: string) => {
    copyToClipboard(value)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const handleDisconnect = () => {
    dispatch(updateUser({ address: '', balance: 0 }))
    navigate('/')
  }

  return (
    <StyledUser>
      <Box onClick={() => toggleOpen()} style={styles.userContainer}>
        <Box style={styles.userInnerContainer}>
          <Box
            sx={{
              marginRight: '10px'
            }}
          >
            <Avatar
              style={{ width: '24px', height: '24px' }}
              src={TestAvatar}
              alt="Avatar"
            />
          </Box>
          <Typography>Hi, james.eth</Typography>
          <Box style={{ marginLeft: '35px' }}>
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
      <Collapse
        onMouseLeave={() => setOpen(false)}
        style={{ marginTop: '-28px', zIndex: '-1' }}
        in={open}
      >
        <Box style={styles.dropdownMenuContainer}>
          <Box style={{ marginTop: '40px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Avatar
                style={{ width: '36px', height: '36px' }}
                src={UserMenuAvatar}
                alt="Avatar"
              />
            </Box>
            <Box style={{ display: 'flex' }}>
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
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
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
              <Tooltip title="Go to Explorer">
                <img
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  src={LinkIcon}
                  alt="Link"
                />
              </Tooltip>
            </Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px'
              }}
            >
              <Button onClick={() => handleDisconnect()}>Disconnect</Button>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </StyledUser>
  )
}

export default UserInfo
