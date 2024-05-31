import React, { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { users } from '../../data/dummy-users'

const SearchBar: React.FC<{ onSearch: (term: string) => void }> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredUsers = users.filter(
        (user) =>
          user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSuggestions(filteredUsers)
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
  }

  const handleSuggestionClick = (userId: string) => {
    navigate(`/user/${userId}`)
    setSearchTerm('')
    setSuggestions([])
  }

  const handleSearchSubmit = () => {
    onSearch(searchTerm)
    setSuggestions([])
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSearchSubmit()
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
      >
        <FiSearch className="text-gray-700 dark:text-gray-300 mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="検索"
          className="bg-transparent outline-none w-full text-gray-700 dark:text-gray-300"
        />
        <button type="submit" className="hidden"></button>
      </form>
      {searchTerm.length > 0 && (
        <div className="absolute z-50 top-full left-0 w-full bg-white dark:bg-gray-800 mt-2 rounded-lg shadow-lg">
          <div
            onClick={handleSearchSubmit}
            className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex text-gray-800 dark:text-gray-200">
              {`「${searchTerm}」を検索`}
            </div>
          </div>
          {suggestions.length > 0 && (
            <hr className="border-gray-300 dark:border-gray-700" />
          )}
          {suggestions.map((user) => (
            <div
              key={user.id}
              onClick={() => handleSuggestionClick(user.userId)}
              className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <img
                  src={user.image}
                  alt={user.userId}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="text-gray-800 dark:text-gray-200 font-semibold">
                    {user.userName}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    @{user.userId}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
