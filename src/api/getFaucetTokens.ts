import axios from 'axios'

const getFaucetTokens = async (faucedUrl: string, data: {
  address: string
  coins: Array<string>
  captchaResponse: string
}) => {
  return axios.post(faucedUrl, data)
}

export default getFaucetTokens
