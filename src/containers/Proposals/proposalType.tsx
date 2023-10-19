interface ProposalData {
  "@type": string;
  content?: {
    "@type": string;
    [key: string]: any;
  };
  [key: string]: any;
}

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
      return type.split('.').pop() || type
  }
}

export const extractProposalTypeFromContent = (data: any): string => {
  let type = "Unknown"
  if (data[0]) {
    let parsedData: ProposalData = JSON.parse(JSON.stringify(data[0]));
    if (parsedData.content) {
      type = parsedData.content["@type"]
    }
  }
  return proposalType(type)
}

export const isLegacyProposal = (type: string): boolean => {
  return type.includes("LegacyContent")
}
