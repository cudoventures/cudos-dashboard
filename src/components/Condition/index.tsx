import ConditionContainer from './styles'

const Condition: React.FC<{
  color?: string
}> = ({ color }) => {
  return <ConditionContainer color={color} />
}

export default Condition
