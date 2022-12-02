import axios from 'axios'

const getFaucetTokens = async (faucetAddress: string, data: {
  address: string
  coins: Array<string>
  captchaResponse: string
}) => {
  return axios.post(faucetAddress, data)
}

export default getFaucetTokens
