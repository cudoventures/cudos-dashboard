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
  } else if (status === 2) {
    results.status = 'unbonding'
  } else if (status === 1) {
    results.status = 'unbonded'
  } else {
    results.status = 'unknown'
  }

  return results
}

export const getCondition = (condition: number, status: number) => {
  let result = 'n/a'
  if (status === 3) {
    if (condition > 90) {
      result = 'good'
    } else if (condition > 70 && condition < 90) {
      result = 'moderate'
    } else {
      result = 'bad'
    }
  }
  return result
}
