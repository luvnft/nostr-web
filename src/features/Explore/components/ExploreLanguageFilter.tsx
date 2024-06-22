import React from 'react'

interface ExploreLanguageFilterProps {
  languageGroupFilter: string
  setLanguageGroupFilter: (language: string) => void
}

const ExploreLanguageFilter: React.FC<ExploreLanguageFilterProps> = ({
  languageGroupFilter,
  setLanguageGroupFilter,
}) => {
  return (
    <div className="flex flex-wrap items-center">
      <label className="mr-2 text-sm text-gray-700 dark:text-gray-300">
        Language group:
      </label>
      <select
        value={languageGroupFilter}
        onChange={(e) => setLanguageGroupFilter(e.target.value)}
        className="p-1 text-sm text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
      >
        <option value="all">Global</option>
        <option value="english">English</option>
        <option value="japanese">Japanese</option>
        <option value="spanish">Spanish</option>
        <option value="chinese">Chinese</option>
        <option value="hindi">Hindi</option>
        <option value="arabic">Arabic</option>
        <option value="portuguese">Portuguese</option>
        <option value="russian">Russian</option>
        <option value="french">French</option>
        <option value="german">German</option>
        {/* Add more language groups as needed */}
      </select>
    </div>
  )
}

export default ExploreLanguageFilter

