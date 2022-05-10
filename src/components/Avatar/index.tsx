import { useEffect, useRef, useState } from 'react'
import * as jdenticon from 'jdenticon'
import AvatarContainer from './styles'

type AvatarProps = {
  imageUrl?: string
  address: string
}

const Avatar: React.FC<AvatarProps> = ({ address, imageUrl }) => {
  const icon = useRef(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    jdenticon.update(icon.current!, address)
  }, [address, error, imageUrl])

  const handleError = () => {
    setError(true)
  }

  return (
    <AvatarContainer>
      {imageUrl && !error ? (
        <img src={imageUrl} alt="address avatar" onError={handleError} />
      ) : (
        <svg
          data-jdenticon-value={address}
          height="100%"
          ref={icon}
          width="100%"
        />
      )}
    </AvatarContainer>
  )
}

export default Avatar
