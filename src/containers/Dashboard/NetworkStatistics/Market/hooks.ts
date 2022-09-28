import * as R from 'ramda'
import numeral from 'numeral'
import { useDispatch } from 'react-redux'
import { getDenom } from 'utils/get_denom'
import { useMarketDataQuery, MarketDataQuery } from 'graphql/types'
import { chainConfig } from 'configs'
import { formatToken } from 'utils/format_token'
import { MarketState, updateMarket } from 'store/market'

export const useMarket = () => {
  const dispatch = useDispatch()

  const formatUseChainIdQuery = (data: MarketDataQuery): MarketState => {
    let price = null
    let marketCap = 0
    let communityPool: TokenUnit = {
      value: '0',
      displayDenom: '',
      baseDenom: '',
      exponent: 0
    }

    if (data?.tokenPrice?.length) {
      price = numeral(
        numeral(data?.tokenPrice[0]?.price).format('0.[0000]', Math.floor)
      ).value()
      marketCap = data.tokenPrice[0]?.marketCap
    }

    const [communityPoolCoin]: any = R.pathOr(
      [],
      ['communityPool', 0, 'coins'],
      data
    ).filter((x: any) => x.denom === chainConfig.primaryTokenUnit)
    const inflation = R.pathOr(0, ['inflation', 0, 'value'], data)
    const apr = R.pathOr(0, ['apr', 0, 'value'], data)

    const rawSupplyAmount = getDenom(
      R.pathOr([], ['supply', 0, 'coins'], data),
      chainConfig.primaryTokenUnit
    ).amount
    const supply = formatToken(rawSupplyAmount, chainConfig.primaryTokenUnit)

    if (communityPoolCoin) {
      communityPool = formatToken(
        communityPoolCoin.amount,
        communityPoolCoin.denom
      )
    }

    const bondedTokens = R.pathOr(1, ['bondedTokens', 0, 'bonded_tokens'], data)

    return {
      price,
      supply,
      marketCap,
      inflation,
      communityPool,
      apr,
      bondedTokens
    }
  }

  useMarketDataQuery({
    variables: {
      denom:
        chainConfig?.tokenUnits[
          chainConfig.primaryTokenUnit
        ]?.display.toLowerCase()
    },
    onCompleted: (data) => {
      if (data) {
        dispatch(updateMarket(formatUseChainIdQuery(data)))
      }
    }
  })
}
