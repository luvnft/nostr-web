import React from 'react'
import Widget from './Widget'

const WidgetRecommendedRelays: React.FC = () => {
  const relays = [
    {
      id: 1,
      name: 'Relay One',
      description: 'This is the first relay',
      url: 'wss://relay1.example.com',
    },
    {
      id: 2,
      name: 'Relay Two',
      description: 'This is the second relay',
      url: 'wss://relay2.example.com',
    },
    {
      id: 3,
      name: 'Relay Three',
      description: 'This is the third relay',
      url: 'wss://relay3.example.com',
    },
  ]

  return (
    <Widget topic="Recommended Relays">
      {relays.map((relay) => (
        <div
          key={relay.id}
          className="flex items-center justify-between py-2 border-b dark:border-gray-600"
        >
          <div className="flex items-center space-x-4">
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-300">
                {relay.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {relay.description}
              </div>
              <div className="text-sm text-blue-500 dark:text-blue-300">
                {relay.url}
              </div>
            </div>
          </div>
          <button className="px-2 py-1 text-sm text-black transition bg-white rounded-full font-noto-sans hover:bg-gray-50">
             Connection
          </button>
        </div>
      ))}
      <div className="mt-4 text-blue-500 cursor-pointer dark:text-blue-300 hover:underline">
         Show More
      </div>
    </Widget>
  )
}

export default WidgetRecommendedRelays
