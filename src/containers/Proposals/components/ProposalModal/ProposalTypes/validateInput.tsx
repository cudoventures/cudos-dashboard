export const validateInput = (proposalData: any) => {
  let proposalError = true

  const requiredFieldCheck =
    proposalData.title !== '' &&
    proposalData.description !== '' &&
    proposalData.depositAmount !== 0 &&
    proposalData.depositAmount !== ''

  const softwareUpdateCheck =
    proposalData.plan !== '' &&
    proposalData.height !== 0 &&
    proposalData.height !== '' &&
    proposalData.info !== ''

  const parameterChanegCheck =
    proposalData.changeSubspace !== '' &&
    proposalData.changeKey !== '' &&
    proposalData.changeValue !== 0 &&
    proposalData.changeValue !== ''

  const communityPoolSpendCheck =
    proposalData.poolSpendRecipient !== '' &&
    proposalData.poolSpendAmount !== ''

  const updateClientCheck =
    proposalData.subjectClientId !== '' &&
    proposalData.substituteClientId !== ''

  const ibcUpgradeCheck =
    proposalData.upgradeName !== '' &&
    proposalData.upgradeHeight !== 0 &&
    proposalData.upgradeHeight !== '' &&
    proposalData.upgradeInfo !== '' &&
    proposalData.ibcUpgradeFile !== ''

  switch (proposalData.type) {
    case 1:
      if (requiredFieldCheck) {
        proposalError = false
      }
      break
    case 2:
      if (requiredFieldCheck && softwareUpdateCheck) {
        proposalError = false
      }
      break
    case 3:
      if (requiredFieldCheck) {
        proposalError = false
      }
      break
    case 4:
      if (requiredFieldCheck && parameterChanegCheck) {
        proposalError = false
      }
      break
    case 5:
      if (requiredFieldCheck && communityPoolSpendCheck) {
        proposalError = false
      }
      break
    case 6:
      if (requiredFieldCheck && updateClientCheck) {
        proposalError = false
      }
      break
    case 7:
      if (requiredFieldCheck && ibcUpgradeCheck) {
        proposalError = false
      }
      break

    default:
      break
  }
  return { error: proposalError }
}
