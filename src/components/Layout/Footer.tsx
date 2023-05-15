import { Box, Container, Grid, Typography } from '@mui/material'
import moment from 'moment'
import TwitterIcon from 'assets/vectors/twitter.svg?component'
import TelegramIcon from 'assets/vectors/telegram.svg?component'
import DiscordIcon from 'assets/vectors/discord.svg?component'
import LinkedInIcon from 'assets/vectors/linkedin.svg?component'
import MediumIcon from 'assets/vectors/medium.svg?component'
import YouTubeIcon from 'assets/vectors/youtube.svg?component'
import FacebookIcon from 'assets/vectors/facebook.svg?component'
import SpotifyIcon from 'assets/vectors/spotify.svg?component'
import { APP_DETAILS } from 'utils/constants'
import { styles } from './styles'

const linksLeft = [
  {
    text: 'Terms & Conditions',
    url: 'https://www.cudos.org/terms-and-conditions/'
  },
  { text: 'Privacy Policy', url: 'https://www.cudos.org/privacy-policy' },
  { text: 'cudos.org', url: 'https://www.cudos.org/' },
  { text: `License © 2018 - ${moment().year()}`, url: 'https://www.cudos.org/' },
  { text: `${APP_DETAILS.DEPLOYMENT_VERSION}`, url: `https://github.com/CudoVentures/cudos-dashboard/releases/tag/${APP_DETAILS.DEPLOYMENT_VERSION}` }
]

const linksRight = [
  { icon: <TwitterIcon />, url: 'https://twitter.com/CUDOS_' },
  { icon: <TelegramIcon />, url: 'https://t.me/cudostelegram' },
  { icon: <DiscordIcon />, url: 'https://discord.com/invite/t397SKqf4u' },
  { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/company/cudos1' },
  { icon: <MediumIcon />, url: 'https://medium.com/cudos' },
  { icon: <YouTubeIcon />, url: 'https://www.youtube.com/c/CUDOS' },
  { icon: <FacebookIcon />, url: 'https://www.facebook.com/cudos.org' },
  {
    icon: <SpotifyIcon />,
    url: 'https://open.spotify.com/show/2lZuBXJ270g7taK06tnK35'
  }
]

const Footer = () => {
  return (
    <Box sx={styles.footerContainer} gap={6}>
      <Container maxWidth={false}>
        <Grid container>
          <Box display="flex" alignItems="center">
            {linksLeft.map((link) => (
              <Grid
                item
                key={link.text}
                sx={({ palette }) => ({
                  padding: `0 0.5rem`,
                  '&:not(:last-child)': {
                    borderRight: `1px solid ${palette.text.secondary}`
                  },
                  cursor: 'pointer',
                  color: palette.text.secondary,
                  '&:hover': {
                    color: palette.primary.main,
                    textShadow: `0 0 3px ${palette.primary.main}`
                  }
                })}
                onClick={() => window.open(link.url, '_blank')?.focus()}
              >
                <Typography fontSize="0.8rem" fontWeight={500}>
                  {link.text}
                </Typography>
              </Grid>
            ))}
          </Box>
          <Box
            alignItems="center"
            display="flex"
            gap={3}
            sx={{ marginLeft: 'auto' }}
          >
            {linksRight.map((link) => (
              <Grid
                key={link.url}
                onClick={() => window.open(link.url, '_blank')?.focus()}
                sx={({ palette }) => ({
                  cursor: 'pointer',
                  color: palette.text.secondary,
                  '&:hover': {
                    color: palette.primary.main
                  }
                })}
              >
                {link.icon}
              </Grid>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
