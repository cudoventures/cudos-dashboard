export const proposalType = (type: string) => {
  switch (type) {
    case '/cosmos.gov.v1beta1.TextProposal':
      return 'Text'
    case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
      return 'Community Pool Spend'
    case '/ibc.core.client.v1.UpgradeProposal':
      return 'IBC Upgrade'
    case '/ibc.core.client.v1.ClientUpdateProposal':
      return 'Client Update'
    case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
      return 'Software Upgrade'
    case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
      return 'Cancel Software Upgrade'
    case '/cosmos.params.v1beta1.ParameterChangeProposal':
      return 'Parameter Change'
    default:
      return {}
  }
}
