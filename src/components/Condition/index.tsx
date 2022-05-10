import ConditionContainer from './styles'

const Condition: React.FC<{
  color: string
}> = ({ color = 'grey' }) => {
  return <ConditionContainer color={color} />
}

export default Condition
