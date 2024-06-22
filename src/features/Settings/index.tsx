import React from 'react'
import SettingSidebar from './components/SettingSidebar'
import SettingContent from './components/SettingContent'
import { useLocation } from 'react-router-dom'
import { FiEye, FiLogOut, FiUser } from 'react-icons/fi'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { BiServer } from 'react-icons/bi'
import { SettingNavigationItem } from './types'

const settingItems: SettingNavigationItem[] = [
  { id: 'account', label: 'Profile', icon: FiUser },
  { id: 'wallet', label: 'Wallet', icon: MdAccountBalanceWallet },
  { id: 'relay', label: 'Relay', icon: BiServer },
  { id: 'display', label: 'Display', icon: FiEye },
  { id: 'logout', label: 'Logout', icon: FiLogOut },
]

const toSettingItem = (id: string): SettingNavigationItem =>
  settingItems.find((item) => `/${item.id}` === id) ?? settingItems[0]

const SettingsPage: React.FC = () => {
  const location = useLocation()

  const activeSettingId = location.pathname.substring(9) // Remove leading '/settings'
  const settingOpened = activeSettingId !== ''
  const selected = toSettingItem(activeSettingId)

  const handleBack = () => {
    // 遷移元がサイドバーの場合とユーザページの場合がある
    window.history.back()
  }

  return (
    <div className="flex h-full">
      <SettingSidebar
        settingItems={settingItems}
        className={settingOpened ? 'hidden sm:block' : 'block'}
      />
      <div className="flex-1 mb-20 sm:mb-0">
        {settingOpened ? (
          <SettingContent selected={selected} onBack={handleBack} />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default SettingsPage
