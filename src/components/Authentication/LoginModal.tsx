import React, { useState, useRef } from 'react'
import { FiLogIn, FiKey } from 'react-icons/fi'
import { useClickAway } from 'react-use'
import PrimaryButton from '@/components/ui-parts/PrimaryButton'
import SecondaryButton from '@/components/ui-parts/SecondaryButton'
import TertiaryButton from '@/components/ui-parts/TertiaryButton'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginWithNsecApp: () => void
  onLoginWithExtension: () => void
  onLoginWithImportingKeys: (key: string) => void
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginWithNsecApp,
  onLoginWithExtension,
  onLoginWithImportingKeys,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isImportingKey, setIsImportingKey] = useState(false)
  const [nsecPrivateKey, setNsecPrivateKey] = useState('')

  useClickAway(modalRef, () => {
    if (isImportingKey) {
      setIsImportingKey(false)
    } else {
      onClose()
    }
  })

  if (!isOpen) return null

  const handleLoginWithImportingKeys = () => {
    onLoginWithImportingKeys(nsecPrivateKey)
    onClose()
  }

  const handleClickCloseLoginWithImportingKeys = () => {
    setIsImportingKey(false)
  }

  const renderLoginButtons = () => (
    <>
      <h1 className="mb-8 text-2xl font-bold text-gray-900 md:text-4xl dark:text-white font-mplus-2">
        A
      </h1>
      <PrimaryButton
        className="w-full py-3 pl-8 pr-8 mb-4"
        onClick={onLoginWithNsecApp}
      >
        <FiLogIn className="mr-2" />
        Log in with Nsec.app
      </PrimaryButton>
      <SecondaryButton
        className="w-full py-3 pl-8 pr-8 mb-4"
        onClick={onLoginWithExtension}
      >
        <FiLogIn className="mr-2" />
        Log in with browser extension
      </SecondaryButton>
      <TertiaryButton
        className="w-full py-3 pl-8 pr-8"
        onClick={() => setIsImportingKey(true)}
      >
        <FiKey className="mr-2" />
        Import private key
      </TertiaryButton>
    </>
  )

  const renderImportKeyField = () => (
    <div className="flex flex-col items-center w-full">
      <input
        type="text"
        placeholder="nsec..."
        value={nsecPrivateKey}
        onChange={(e) => setNsecPrivateKey(e.target.value)}
        className="min-w-[300px] w-full py-3 px-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
      />
      <PrimaryButton
        className="w-full py-3 pl-8 pr-8 max-w-2/3"
        onClick={handleLoginWithImportingKeys}
      >
        <FiLogIn className="mr-2" />
        ログイン
      </PrimaryButton>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative flex flex-col items-center justify-center w-full max-w-md p-6 mx-0 bg-white rounded-lg shadow-lg dark:bg-gray-800 md:p-16 md:mx-auto min-h-52"
      >
        <div
          className="absolute z-10 flex items-center justify-center w-10 h-10 text-xl text-black rounded-full cursor-pointer top-2 right-2 dark:text-white hover:bg-gray-500 hover:bg-opacity-25"
          onClick={
            isImportingKey ? handleClickCloseLoginWithImportingKeys : onClose
          }
        >
          ✕
        </div>

        {isImportingKey ? renderImportKeyField() : renderLoginButtons()}
      </div>
    </div>
  )
}

export default LoginModal
