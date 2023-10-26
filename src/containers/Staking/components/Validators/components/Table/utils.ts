import { Column } from 'components/Table/types'
import { gql } from '@apollo/client';
import { Coin } from 'cudosjs';

export interface Delegation {
  validator_address: string;
  coins: Coin[];
  delegator_address: string;
}

export interface ActionValidatorDelegations {
  delegations: Delegation[];
}

export interface DelegationsResponse {
  action_validator_delegations: ActionValidatorDelegations;
}

export const FETCH_DELEGATIONS = gql`
query FetchDelegations($validatorAddress: String!, $limit: Int!) {
  action_validator_delegations(address: $validatorAddress, limit: $limit) {
    delegations
  }
}
`;

const columns: Column[] = [
  {
    key: 'idx',
    label: '#',
    width: 50
  },
  {
    key: 'validator',
    label: 'Validator',
    color: 'text.primary'
  },
  {
    key: 'votingPower',
    label: 'Voting Power',
    sortKey: 'votingPower',
    sort: true
  },
  {
    key: 'myDelegation',
    label: 'My Delegation',
    sortKey: 'myDelegation',
    sort: true
  },
  {
    key: 'commission',
    label: 'Commission',
    sortKey: 'commission',
    align: 'center',
    sort: true,
    color: 'primary.main',
    width: 70
  },
  {
    key: 'self',
    label: 'Self %',
    sortKey: 'selfPercent',
    align: 'right',
    sort: true,
    width: 120
  },
  {
    key: 'delegators',
    label: 'Delegators',
    sortKey: 'delegators',
    align: 'center',
    sort: true
  },
  {
    key: 'condition',
    label: 'Condition',
    sortKey: 'condition',
    align: 'center',
    sort: true,
    width: 120
  },
  {
    key: 'action',
    label: 'Action',
    align: 'center'
  }
]

export default columns
