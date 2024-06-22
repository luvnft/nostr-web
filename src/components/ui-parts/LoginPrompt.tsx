import React, { useState } from 'react'
import LoginModal from '@/components/Authentication/LoginModal'
import PrimaryButton from '@/components/ui-parts/PrimaryButton'
import { isLoggedInAtom } from '@/state/atoms'
import { useAtom } from 'jotai'

const LoginPrompt: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  const handleLoginWithNsecApp = () => {
    // Open Nsec app
  }

  const handleLoginWithExtension = () => {
    // Open browser extension
  }

  const handleLoginWithImportingKeys = (nsecPrivateKey: string) => {
    // Import keys
  }

  const handleLogin = (method: () => void) => {
    method()
    setIsLoggedIn(true)
    closeLoginModal()
  }

  if (isLoggedIn) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <p className="pl-2 font-semibold text-gray-700 sm:pl-4 dark:text-gray-300 font-mplus-2">
          ロSign in to get started with Nostr
        </p>
        <PrimaryButton className="px-4 py-2" onClick={openLoginModal}>
          ロSign in
        </PrimaryButton>
      </div>
      <hr className="border-gray-200 border-1 dark:border-gray-700" />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginWithNsecApp={() => handleLogin(handleLoginWithNsecApp)}
        onLoginWithExtension={() => handleLogin(handleLoginWithExtension)}
        onLoginWithImportingKeys={(nsecPrivateKey: string) =>
          handleLogin(() => handleLoginWithImportingKeys(nsecPrivateKey))
        }
      />
    </>
  )
}

export default LoginPrompt
