import { useState } from 'react'
import { Avatar, Box, Typography, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'store'
import { copyToClipboard, formatAddress } from 'utils/projectUtils'
import Card from 'components/Card'
import TestAvatar from 'assets/vectors/test-avatar.svg'
import CopyIcon from 'assets/vectors/copy-icon.svg'
import EditIcon from 'assets/vectors/edit-icon.svg'
import OnlineStatusIcon from 'assets/vectors/online-status.svg'
import LinkIcon from 'assets/vectors/link-icon.svg'
import TickIcon from 'assets/vectors/tick-icon.svg'

import { styles } from '../styles'

const WalletInformation = () => {
  const navigate = useNavigate()
  const { address } = useSelector((state: RootState) => state.profile)

  const [copied, setCopied] = useState<boolean>(false)

  const handleEditButton = () => {
    navigate('/settings')
  }

  const handleViewButton = () => {
    navigate('/settings')
  }

  const handleCopy = (value: string) => {
    copyToClipboard(value)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <Card sx={styles.walletInfoCard}>
      <Box sx={styles.walletInfoContainer}>
        <Typography sx={styles.subheaderStyle} color="text.secondary">
          WALLET INFORMATION
        </Typography>
        <Box onClick={() => handleEditButton()} sx={styles.editButton}>
          <Typography color="primary.main" sx={styles.editButtonStyle}>
            <img
              style={{
                marginRight: '10px'
              }}
              src={EditIcon}
              alt="Edit"
            />
            Edit
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={TestAvatar} alt="Avatar" sx={styles.avatarStyle} />
        <Box sx={{ marginLeft: '20px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={styles.usernameStyle}>!cudos</Typography>
            <img
              style={{ marginLeft: '5px', marginBottom: '10px' }}
              src={TickIcon}
              alt="Tick"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography
              color="text.secondary"
              sx={{ fontSize: '12px', marginBottom: '10px' }}
            >
              {formatAddress(address, 20)}
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
                <a
                  href={import.meta.env.VITE_APP_EXPLORER_V2?.toString()}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                    src={LinkIcon}
                    alt="Link"
                  />
                </a>
              </Tooltip>
            </Typography>
          </Box>
          <Box onClick={() => handleViewButton()}>
            <Typography
              color="primary.main"
              sx={{ fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              View Profile
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '25px',
          marginBottom: '5px'
        }}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
          Network
        </Typography>
      </Box>
      <Box sx={styles.networkInfoContainer}>
        <Box>
          <span>
            <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>
              {import.meta.env.VITE_APP_CHAIN_NAME}
            </Typography>
          </span>
        </Box>
        <Box>
          <span>
            <Typography sx={styles.connectionStatus}>
              <img
                style={{ marginRight: '10px' }}
                src={OnlineStatusIcon}
                alt="Online Status"
              />
              Connected
            </Typography>
          </span>
        </Box>
      </Box>
      <Box />
    </Card>
  )
}

export default WalletInformation
