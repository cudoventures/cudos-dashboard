import { StyledNetwork, styles } from './networkStyles'
import { CHAIN_DETAILS } from 'utils/constants'
import { COLORS_DARK_THEME } from 'theme/colors'
import GlobusIcon from 'assets/vectors/globus-icon.svg?component'
import { Typography, Box } from '@mui/material'
import { RootState } from 'store'
import { useSelector } from 'react-redux'
import { getChainPrettyName } from 'utils/projectUtils'

const NetworkInfo = () => {

  const { loadingState } = useSelector((state: RootState) => state.profile)
  const aliasChainName = getChainPrettyName(CHAIN_DETAILS.CHAIN_ID)

  return (
    <StyledNetwork>
      <Box style={styles.userContainer} >
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
        </Box>
      </Box>
    </StyledNetwork>
  )
}

export default NetworkInfo
