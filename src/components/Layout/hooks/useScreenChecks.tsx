import { useMediaQuery } from 'react-responsive'
import { SCREEN_RESOLUTIONS } from "utils/constants"

//WIDTH
export const useHighResCheck = () => {
    return useMediaQuery({ query: `(max-width: ${SCREEN_RESOLUTIONS.HIGH}px)` })
}

export const useMidlowResCheck = () => {
    return useMediaQuery({ query: `(max-width: ${SCREEN_RESOLUTIONS.MID_LOW}px)` })
}

export const useLowResCheck = () => {
    return useMediaQuery({ query: `(max-width: ${SCREEN_RESOLUTIONS.LOW}px)` })
}

export const useMidLowerResCheck = () => {
    return useMediaQuery({ query: `(max-width: ${SCREEN_RESOLUTIONS.MID_LOWER}px)` })
}

export const useLowerResCheck = () => {
    return useMediaQuery({ query: `(max-width: ${SCREEN_RESOLUTIONS.LOWER}px)` })
}

export const useMidLowestResCheck = () => {
    return useMediaQuery({ query: `(max-width: ${SCREEN_RESOLUTIONS.MID_LOWEST}px)` })
}

export const useLowestResCheck = () => {
    return useMediaQuery({ query: `(max-width: ${SCREEN_RESOLUTIONS.LOWEST}px)` })
}


//HEIGHT
export const useMidLowestHeight = () => {
    return useMediaQuery({ query: `(max-height: ${SCREEN_RESOLUTIONS.MID_LOWEST}px)` })
}
