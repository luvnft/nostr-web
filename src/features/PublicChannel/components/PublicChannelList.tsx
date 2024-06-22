import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PublicChannels, PublicChannelType } from '../types'

interface PublicChannelListProps {
  selectedChannel: PublicChannelType
  onSelectChannel: (channel: PublicChannelType) => void
}

const PublicChannelList: React.FC<PublicChannelListProps> = ({
  selectedChannel,
  onSelectChannel,
}) => {
  const navigate = useNavigate()

  const handleChannelClick = (channel: PublicChannelType) => {
    onSelectChannel(channel)
    navigate(`/public-channel/${channel.id}`)
  }

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 border-r-8 border-gray-200 dark:bg-gray-950 dark:border-gray-900">
      <h2 className="mb-4 text-lg font-bold">Public Channels</h2>
      <ul className="flex-grow overflow-auto">
        {PublicChannels.map((channel) => (
          <li
            key={channel.id}
            onClick={() => handleChannelClick(channel)}
            className={`cursor-pointer p-2 ${channel.id === selectedChannel.id ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'} hover:bg-gray-200 dark:hover:bg-gray-900 text-sm font-noto-sans rounded`}
          >
            # {channel.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PublicChannelList
