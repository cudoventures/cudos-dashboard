import React from 'react'
import Dialog from 'components/Dialog'
import { VotingStatus, initialModalState } from 'store/votingModal'
import useModal from './hooks'
import Loading from './Loading'
import Success from './Success'
import Failure from './Failure'
import Vote from './Vote'

const VotingModal = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  const renderComponent = () => {
    switch (status) {
      case VotingStatus.LOADING:
        return <Loading />
      case VotingStatus.SUCCESS:
        return <Success modalProps={modal} handleModal={handleModal} />
      case VotingStatus.FAILURE:
        return <Failure modalProps={modal} handleModal={handleModal} />
      case VotingStatus.VOTE:
        return <Vote modalProps={modal} handleModal={handleModal} />
      default:
        return null
    }
  }

  return (
    <Dialog
      height={{ minHeight: '100%' }}
      open={open}
      handleClose={handleClose}
    >
      {renderComponent()}
    </Dialog>
  )
}

export default VotingModal
