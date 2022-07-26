import axios from 'axios'
import { GET_FAUCET_TOKENS } from './config'

const getFaucetTokens = async (data: {
  address: string
  coins: Array<string>
  captchaResponse: string
}) => {
  return axios.post(GET_FAUCET_TOKENS, data)
}

export default getFaucetTokens
