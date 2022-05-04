import axios from 'axios'
import { GET_CURRENCY_RATE_URL } from './config'

const getCurrencyRate = async (currency: string) => {
  return axios.get(`${GET_CURRENCY_RATE_URL(currency)}`)
}

export default getCurrencyRate
