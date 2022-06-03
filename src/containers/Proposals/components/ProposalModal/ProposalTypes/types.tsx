/* eslint-disable import/prefer-default-export */
import TextProposal from './TextProposal'
import SoftwareUpdate from './SoftwareUpdate'
import CancelSoftwareUpdate from './CancelSoftwareUpdate'
import ParameterChange from './ParameterChange'
import CommunityPoolSpend from './CommunityPoolSpend'
import UpdateClient from './UpdateClient'
import IBCUpgrade from './IBCUpgrade'

export const typeSwitch = (modalType: string) => {
  switch (modalType) {
    case '1':
      return <TextProposal />
    case '2':
      return <SoftwareUpdate />
    case '3':
      return <CancelSoftwareUpdate />
    case '4':
      return <ParameterChange />
    case '5':
      return <CommunityPoolSpend />
    case '6':
      return <UpdateClient />
    case '7':
      return <IBCUpgrade />
    default:
      return <TextProposal />
  }
}
