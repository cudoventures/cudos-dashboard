import { Box, Grid, Typography } from '@mui/material'
import FooterLogo from 'assets/vectors/logo-footer.svg'
import RedditIcon from 'assets/vectors/reddit.svg?component'
import TwitterIcon from 'assets/vectors/twitter.svg?component'
import TelegramIcon from 'assets/vectors/telegram.svg?component'
import DiscordIcon from 'assets/vectors/discord.svg?component'

import { styles } from './styles'

const linksLeft = [
  { text: 'FAQ', url: 'https://www.cudos.org/' },
  { text: 'Terms & Conditions', url: 'https://www.cudos.org/' },
  { text: 'Privacy Policy', url: 'https://www.cudos.org/' },
  { text: 'cudos.org', url: 'https://www.cudos.org/' },
  { text: 'License © 2018 - 2022', url: 'https://www.cudos.org/' }
]

const linksRight = [
  // { icon: <RedditIcon />, url: 'https://www.cudos.org/' },
  { icon: <TwitterIcon />, url: 'https://twitter.com/CUDOS_' },
  { icon: <TelegramIcon />, url: 'https://t.me/cudostelegram' },
  { icon: <DiscordIcon />, url: 'https://discord.com/invite/t397SKqf4u' }
]

const Footer = () => {
  return (
    <Box sx={styles.footerContainer} gap={6}>
      <Grid item>
        <img src={FooterLogo} alt="logo" />
      </Grid>
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
    </Box>
  )
}

export default Footer
