/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import * as R from 'ramda'
import numeral from 'numeral'
import { useRecoilState, SetterOrUpdater } from 'recoil'
import Big from 'big.js'
import { useDispatch } from 'react-redux'
import { writeMarket } from './selectors'
import { AtomState } from './types'
import { getDenom } from '../../../../utils/get_denom'
import { useMarketDataQuery, MarketDataQuery } from '../../../../graphql/types'
import { chainConfig } from '../../../../configs'
import { formatToken } from '../../../../utils/format_token'
import { updateMarket } from '../../../../store/market'

export const useMarketRecoil = () => {
  const [market, setMarket] = useRecoilState(writeMarket) as [
    AtomState,
    SetterOrUpdater<AtomState>
  ]

  const dispatch = useDispatch()

  useMarketDataQuery({
    variables: {
      denom:
        chainConfig?.tokenUnits[
          chainConfig.primaryTokenUnit
        ]?.display.toLowerCase()
    },
    onCompleted: (data) => {
      if (data) {
        setMarket(formatUseChainIdQuery(data))
        dispatch(updateMarket(formatUseChainIdQuery(data)))
      }
    }
  })

  const formatUseChainIdQuery = (data: MarketDataQuery): AtomState => {
    let { communityPool, price, marketCap } = market

    if (data?.tokenPrice?.length) {
      price = numeral(
        numeral(data?.tokenPrice[0]?.price).format('0.[0000]', Math.floor)
      ).value()
      marketCap = data.tokenPrice[0]?.marketCap
    }

    const [communityPoolCoin] = R.pathOr(
      [],
      ['communityPool', 0, 'coins'],
      data
    ).filter((x) => x.denom === chainConfig.primaryTokenUnit)
    const inflation = R.pathOr(0, ['inflation', 0, 'value'], data)

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

    const apr = Big(rawSupplyAmount)
      .times(inflation)
      .div(bondedTokens)
      .toNumber()

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
}
