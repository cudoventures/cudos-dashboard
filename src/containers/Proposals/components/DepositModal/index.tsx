import React from 'react'
import Dialog from 'components/Dialog'
import { DepositStatus, initialModalState } from 'store/depositModal'
import useModal from './hooks'
import Loading from './Loading'
import Success from './Success'
import Failure from './Failure'
import Deposit from './Deposit'

const DepositModal = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  const renderComponent = () => {
    switch (status) {
      case DepositStatus.LOADING:
        return <Loading />
      case DepositStatus.SUCCESS:
        return <Success modalProps={modal} handleModal={handleModal} />
      case DepositStatus.FAILURE:
        return <Failure modalProps={modal} handleModal={handleModal} />
      case DepositStatus.DEPOSIT:
        return <Deposit modalProps={modal} handleModal={handleModal} />
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

export default DepositModal
