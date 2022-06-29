export const proposalType = (type: string) => {
  switch (type) {
    case 'Text':
      return 'Text'
    case 'CommunityPoolSpend':
      return 'Community Pool Spend'
    case 'IBCUpgrade':
      return 'IBC Upgrade'
    case 'ClientUpdate':
      return 'Client Update'
    case 'SoftwareUpgrade':
      return 'Software Upgrade'
    case 'CancelSoftwareUpgrade':
      return 'Cancel Software Upgrade'
    case 'ParameterChange':
      return 'Parameter Change'
    default:
      return {}
  }
}
