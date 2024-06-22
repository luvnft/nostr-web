import React, { useState } from 'react'
import { FaToggleOn, FaToggleOff } from 'react-icons/fa'
import NavigationSidebarItem from './NavigationSidebarItem'
import NavigationSidebarUserSection from './NavigationSidebarUserSection'
import { NavigationItem, NavigationItemId } from './Navigation'
import { Link } from 'react-router-dom'
import { User } from '@/domain/entities/User'

interface NavigationSidebarProps {
  navigationItems: NavigationItem[]
  activeItemId: NavigationItemId
  user: User
  onNavigate: (to: NavigationItemId) => void
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  navigationItems,
  activeItemId,
  user,
  onNavigate,
}) => {
  const [isMining, setIsMining] = useState(false)

  const handleToggleMining = () => {
    setIsMining(!isMining)
  }

  const isActiveItem = (id: NavigationItemId) => id === activeItemId

  return (
    <div className="fixed z-50 flex flex-col justify-between w-20 h-full px-4 py-6 bg-white border-r border-gray-200 dark:bg-black lg:w-60 dark:border-gray-700 font-mplus-2">
      <div className="space-y-2 lg:space-y-4">
        <Link
          className="items-center hidden p-2 lg:block lg:justify-start lg:space-x-2 font-mplus-2"
          to="/"
        >
          <div className="hidden text-2xl font-bold text-black lg:block dark:text-white">
            A
          </div>
        </Link>
        {navigationItems.map((item: NavigationItem, index: number) => (
          <NavigationSidebarItem
            key={index}
            icon={item.icon}
            id={item.id}
            label={item.label}
            active={isActiveItem(item.id)}
            onClick={() => onNavigate(item.id)}
          />
        ))}
        <div
          className="flex items-center justify-center p-2 text-gray-700 transition rounded-md cursor-pointer lg:justify-start lg:space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300 active:text-gray-400 dark:active:text-gray-400"
          onClick={handleToggleMining}
        >
          {isMining ? (
            <FaToggleOn className="text-xl text-green-500" />
          ) : (
            <FaToggleOff className="text-xl text-gray-400 dark:text-gray-500" />
          )}
          <span
            className={`hidden lg:block ${isMining ? 'text-gray-600 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`}
          >
            {isMining ? 'マイニング ON' : 'マイニング OFF'}
          </span>
        </div>
      </div>
      <NavigationSidebarUserSection user={user} />
    </div>
  )
}

export default NavigationSidebar
