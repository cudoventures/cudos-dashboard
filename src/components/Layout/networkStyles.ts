import { styled, Box } from '@mui/material'
import theme from 'theme'

export const styles = {
    networkSelectionMenuContainer: {
        background: theme.dark.custom.backgrounds.light,
        minWidth: '180px',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        paddingLeft: '20px',
        marginTop: '3px',
        borderRadius: '0px 0px 20px 20px',
        padding: '40px 0px 20px 20px',
        flexDirection: 'column'
    },
    anchorStyle: {
        alignItems: 'center',
        textDecoration: 'none',
        display: 'flex'
    },
    userContainer: {
        padding: '12px 20px',
        position: 'relative',
        background: theme.dark.custom.backgrounds.primary,
        maxWidth: '100%',
        minWidth: 'max-content',
        width: '100%',
        maxHeight: '48px',
        borderRadius: '55px'
    },
    userInnerContainer: {
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'space-between'
    },
} as const

export const StyledNetwork = styled(Box)(({ theme }) => ({
    minWidth: 'max-content',
    position: 'relative',
    width: 'max-content',
    maxHeight: '48px',
    borderRadius: '55px',
    height: '55px',
    marginRight: '20px',
    backgroundColor: theme.custom.backgrounds.primary,
    zIndex: '10'
}))
