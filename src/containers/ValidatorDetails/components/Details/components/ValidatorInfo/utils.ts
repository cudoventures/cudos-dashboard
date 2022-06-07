/**
 * Util to get the validator status
 * @param status 0-3
 * @param jailed boolean
 * @returns an object with status
 */
export const getValidatorStatus = (
  status: number,
  jailed: boolean,
  tombstoned: boolean
) => {
  const results = {
    status: 'na'
  }

  // jailed and tombstone statuses are prioritised over their unbonding state
  if (tombstoned) {
    results.status = 'tombstoned'
    return results
  }

  if (jailed) {
    results.status = 'jailed'
    return results
  }

  if (status === 3) {
    results.status = 'active'
  }
  if (status === 2) {
    results.status = 'unbonding'
  }
  if (status === 1) {
    results.status = 'unbonded'
  }
  if (status < 1 || status > 3) {
    results.status = 'unknown'
  }

  return results
}

export const getCondition = (condition: number, status: number) => {
  let result = 'n/a'
  if (status === 3) {
    if (condition > 90) {
      result = 'good'
    }
    if (condition > 70 && condition < 90) {
      result = 'moderate'
    }
    if (condition <= 70) {
      result = 'bad'
    }
  }
  return result
}
