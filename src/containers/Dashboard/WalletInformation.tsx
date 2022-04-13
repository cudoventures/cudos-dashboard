import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import Card from '../../components/Card/Card'
import TestAvatar from '../../assets/vectors/test-avatar.svg'
import CopyIcon from '../../assets/vectors/copy-icon.svg'
import EditIcon from '../../assets/vectors/edit-icon.svg'
import OnlineStatusIcon from '../../assets/vectors/online-status.svg'
import LinkIcon from '../../assets/vectors/link-icon.svg'
import TickIcon from '../../assets/vectors/tick-icon.svg'

import { styles } from './styles'

const WalletInformation = () => {
  return (
    <Card style={styles.walletInfoCard}>
      <Box style={styles.walletInfoContainer}>
        <Typography style={styles.subheaderStyle} color="text.secondary">
          WALLET INFORMATION
        </Typography>
        <Box style={styles.editButton}>
          <Typography color="primary.main" style={styles.editButtonStyle}>
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
        <Avatar src={TestAvatar} alt="Avatar" style={styles.avatarStyle} />
        <Box sx={{ marginLeft: '20px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography style={styles.usernameStyle}>!neyris</Typography>
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
              cudos1wyv883wzp843...57qdd
              <img style={{ marginLeft: '10px' }} src={CopyIcon} alt="Copy" />
              <img style={{ marginLeft: '10px' }} src={LinkIcon} alt="Link" />
            </Typography>
          </Box>
          <Box>
            <Typography
              color="primary.main"
              sx={{ fontSize: '14px', fontWeight: '600' }}
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
      <Box style={styles.networkInfoContainer}>
        <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>
          CUDOS Mainnet
        </Typography>
        <Typography color="primary.main" style={styles.networkInfo}>
          Change
        </Typography>
        <Box>
          <Typography style={styles.connectionStatus}>
            <img
              style={{ marginRight: '10px' }}
              src={OnlineStatusIcon}
              alt="Online Status"
            />
            Connected
          </Typography>
        </Box>
      </Box>
      <Box />
    </Card>
  )
}

export default WalletInformation
