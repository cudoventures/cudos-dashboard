// import { TokenUnit } from 'types'
import numeral from 'numeral'
import * as R from 'ramda'
import Big from 'big.js'
import { chainConfig } from '../configs'

/**
 * takes in a number string and removes any lingering 0s
 * ex - 100 -> 1
 * @param value number string
 * @returns a string without lingering 0
 */
export const removeEndingZeros = (value: string) => {
  let end = value.length
  for (let i = value.length; i > 0; i -= 1) {
    const currentDigit = value[i - 1]
    if (currentDigit !== '0') {
      break
    }
    end -= 1
  }
  return value.substring(0, end)
}

/**
 * Util to help me correctly transform a base denom amount
 * in to a display denom amount
 * @param value the current amount
 * @param denom the denom to convert the amount in to
 * @returns TokenUnit
 */
export const formatToken = (
  value: number | string,
  denom: string
): TokenUnit => {
  const selectedDenom = chainConfig.tokenUnits.acudos

  const results: TokenUnit = {
    value: `${value}`,
    displayDenom: denom,
    baseDenom: denom,
    exponent: R.pathOr(0, ['exponent'], selectedDenom)
  }

  if (!selectedDenom) {
    return results
  }

  const ratio = 10 ** selectedDenom.exponent
  results.value = Big(value).div(ratio).toPrecision()
  results.displayDenom = selectedDenom.display
  return results
}

/**
 * Mostly used for formatting tokens as javascript being javascript,
 * cannot handle tokens with 18 decimal places
 * @param tokenUnit string
 * @param toFixed defaults null
 * @returns formatted number with all the decimal places one can wish for
 */
export const formatNumber = (tokenUnit: string, toFixed: number): string => {
  // split whole number and decimal if any
  const split = `${tokenUnit}`.split('.')
  // whole number
  const wholeNumber = R.pathOr('', [0], split).toString()
  // decimal
  const decimal = R.pathOr('', [1], split).toString()
  // add commas for fullnumber ex: 1000 -> 1,000
  const formatWholeNumber = numeral(wholeNumber).format('0,0')

  // in the event that there is actually decimals and tofixed has not been set to 0
  // we will handle the decimal
  if (decimal && toFixed !== 0) {
    // we remove any ending 0s ex - 100 -> 1
    const formatDecimal = removeEndingZeros(
      decimal.substring(0, toFixed || decimal.length)
    )
    // merge the full number together and return it.
    // If for some insane reason after removing all the 0s we ended up with
    // '' in the decimal place we just return the full number
    return `${formatWholeNumber}${
      formatDecimal.length ? '.' : ''
    }${formatDecimal}`
  }

  // else we return whole number
  return formatWholeNumber
}
