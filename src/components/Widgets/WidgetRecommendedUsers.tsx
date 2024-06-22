import React from 'react'
import Widget from './Widget'

const WidgetRecommendedUsers: React.FC = () => {
  const users = [
    {
      id: 1,
      name: 'User One',
      username: '@userone',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'User Two',
      username: '@usertwo',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      name: 'User Three',
      username: '@userthree',
      image: 'https://via.placeholder.com/50',
    },
  ]

  return (
    <Widget topic="Recommended Users">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between py-2 border-b dark:border-gray-600"
        >
          <div className="flex items-center space-x-4">
            <img
              src={user.image}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-300">
                {user.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.username}
              </div>
            </div>
          </div>
          <button className="px-2 py-1 text-sm text-black transition bg-white rounded-full font-noto-sans hover:bg-gray-50">
             Unite
          </button>
        </div>
      ))}
      <div className="mt-4 text-blue-500 cursor-pointer dark:text-blue-300 hover:underline">
         Show more
      </div>
    </Widget>
  )
}

export default WidgetRecommendedUsers
