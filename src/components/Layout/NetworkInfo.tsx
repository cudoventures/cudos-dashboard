import { useState } from 'react'
import { StyledNetwork, styles } from './networkStyles'
import ArrowIcon from 'assets/vectors/arrow-down.svg?component'
import { CHAIN_DETAILS } from 'utils/constants'
import { COLORS_DARK_THEME } from 'theme/colors'
import GlobusIcon from 'assets/vectors/globus-icon.svg?component'
import { Typography, Box, Collapse } from '@mui/material'
import { RootState } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import { handleAvailableNetworks } from 'utils/projectUtils'
import { updateUser } from 'store/profile'
import Card from 'components/Card'

export const networksToDisplayInMenu = handleAvailableNetworks(CHAIN_DETAILS.DEFAULT_NETWORK)

const NetworkLinkComponent = ({ network, setChosenNetwork }: {
  network: networkToDisplay,
  setChosenNetwork: (selectedNetwork: string) => void
}): JSX.Element => {

  const [hovered, setHovered] = useState<boolean>(false)

  return (
    <Box
      style={styles.anchorStyle}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onClick={() => setChosenNetwork(network.SHORT_NAMES[0].toUpperCase())}
    >
      <GlobusIcon
        style={{
          marginRight: '10px',
          color:
            hovered ?
              COLORS_DARK_THEME.PRIMARY_BLUE :
              COLORS_DARK_THEME.SECONDARY_TEXT
        }}
      />
      <Typography
        color={
          hovered ? COLORS_DARK_THEME.PRIMARY_BLUE :
            COLORS_DARK_THEME.SECONDARY_TEXT
        }>
        {network.ALIAS_NAME}
      </Typography>
    </Box>
  )
}

const NetworkInfo = () => {

  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const { chosenNetwork, loadingState } = useSelector((state: RootState) => state.profile)
  const aliasChainName = CHAIN_DETAILS[chosenNetwork as keyof typeof CHAIN_DETAILS].ALIAS_NAME

  const setChosenNetwork = (selectedNetwork: string) => {
    dispatch(updateUser({ chosenNetwork: selectedNetwork }))
    setOpen(false)
  }

  const collapsable = networksToDisplayInMenu.length > 1

  return (

    <StyledNetwork sx={
      !collapsable || loadingState ? {} : { cursor: 'pointer' }}>
      <Box
        onMouseEnter={!collapsable || loadingState ? () => { } : () => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={styles.userContainer}
      >
        <Box style={styles.userInnerContainer}>
          <Box style={{ display: 'flex' }}>
            <GlobusIcon
              style={{
                marginRight: '10px',
                color:
                  loadingState ?
                    COLORS_DARK_THEME.SECONDARY_TEXT :
                    COLORS_DARK_THEME.PRIMARY_BLUE
              }}
            />
            {!loadingState ? <Typography> {aliasChainName} </Typography> :
              <Typography color={'text.secondary'}>
                {aliasChainName}
              </Typography>}
          </Box>
          {collapsable ?
            <Box style={{ marginLeft: '25px' }}>
              <ArrowIcon style={{ color: loadingState ? 'gray' : 'inherit', transform: open ? 'rotate(180deg)' : 'rotate(360deg)' }} />
            </Box> : null}
        </Box>
      </Box>
      <Collapse
        onMouseEnter={!collapsable || loadingState ? () => { } : () => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{ marginTop: '-28px', zIndex: '-1' }}
        in={open}
      >
        <Card elevation={15} style={styles.networkSelectionMenuContainer}>
          {networksToDisplayInMenu.map((NETWORK, idx) => {
            return aliasChainName !== NETWORK.ALIAS_NAME ?
              <NetworkLinkComponent key={idx} network={NETWORK} setChosenNetwork={setChosenNetwork} /> : null
          })}
        </Card>
      </Collapse>
    </StyledNetwork>
  )
}

export default NetworkInfo
