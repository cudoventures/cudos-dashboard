import React from 'react'
import Dialog from 'components/Dialog'
import { initialModalState, ProposalStatus } from 'store/proposals'
import useModal from './hooks'
import Loading from './Loading'
import Success from './Success'
import Failure from './Failure'
import Proposals from './Proposals'

const ProposalModal = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  const renderComponent = () => {
    switch (status) {
      case ProposalStatus.LOADING:
        return <Loading />
      case ProposalStatus.SUCCESS:
        return <Success modalProps={modal} handleModal={handleModal} />
      case ProposalStatus.FAILURE:
        return <Failure modalProps={modal} handleModal={handleModal} />
      case ProposalStatus.CREATE:
        return <Proposals modalProps={modal} handleModal={handleModal} />
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

export default ProposalModal
