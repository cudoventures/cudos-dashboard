import StyledCondition from './styles'

const Condition: React.FC<{
  color?: string
}> = ({ color }) => {
  return <StyledCondition color={color} />
}

export default Condition
