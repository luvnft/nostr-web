import React, { useState } from 'react'
import Input from '@/components/ui-elements/Input'
import BulletOption from '@/components/ui-elements/BulletOption'
import TertiaryButton from '@/components/ui-parts/TertiaryButton'
import { SettingBudgetPeriod } from '../types'
import QRCode from 'qrcode.react'
import PrimaryButton from '@/components/ui-parts/PrimaryButton'
import { MdOutlineQrCode } from 'react-icons/md'

export const budgetPeriods: SettingBudgetPeriod[] = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

const SettingWallet: React.FC = () => {
  const [connectionUri, setConnectionUri] = useState('')
  const [defaultZapAmount, setDefaultZapAmount] = useState(0)
  const [authBudget, setAuthBudget] = useState(0)
  const [budgetPeriodId, setBudgetPeriodId] = useState('daily')
  const [qrCodeValue, setQrCodeValue] = useState('')

  const handleGenerateQRCode = () => {
    const qrValue = `nostr+walletauth://example`
    setQrCodeValue(qrValue)
  }

  const handleSave = () => {
    console.log({
      connectionUri,
      defaultZapAmount,
      authBudget,
      budgetPeriodId,
    })
  }

  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
          Nostr Wallet Connect Settings
        </label>
        <div className="space-y-2">
          <div>
            <label
              htmlFor="connection-uri"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-200"
            >
              Connection URI
            </label>
            <Input
              id="connection-uri"
              type="text"
              value={connectionUri}
              onChange={(e) => setConnectionUri(e.target.value)}
              placeholder="nostr+walletconnect:<pubkey>?relay=<relay>&secret=<secret>"
              className="w-full p-2 bg-transparent border border-gray-200 rounded-md dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="zap-amount"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-200"
            >
              Default Zap Amount (sats)
            </label>
            <Input
              id="zap-amount"
              type="number"
              value={defaultZapAmount.toString()}
              onChange={(e) => setDefaultZapAmount(Number(e.target.value))}
              className="w-full p-2 bg-transparent border border-gray-200 rounded-md dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
  
      <div className="space-y-4">
        <label className="block mb-2 text-gray-700 dark:text-gray-200">
          Nostr Wallet Auth
        </label>
        <div className="space-y-2">
          <div>
            <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200">
              Initialization Period
            </label>
            <div className="flex mt-2">
              {budgetPeriods.map((period) => (
                <BulletOption
                  key={period.id}
                  id={period.id}
                  label={period.label}
                  selected={budgetPeriodId === period.id}
                  onSelect={setBudgetPeriodId}
                />
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="budget"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-200"
            >
              Budget Setting (sats)
            </label>
            <Input
              id="budget"
              type="number"
              value={authBudget.toString()}
              onChange={(e) => setAuthBudget(Number(e.target.value))}
              className="w-full p-2 bg-transparent border border-gray-200 rounded-md dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <TertiaryButton
          onClick={handleGenerateQRCode}
          className="w-[200px] rounded-md"
        >
          <MdOutlineQrCode className="mr-2" />
          Generate NWA QR Code
        </TertiaryButton>
        {qrCodeValue && (
          <div className="p-2 border w-[220px] h-[220px] border-gray-200 dark:border-gray-700 bg-white">
            <QRCode value={qrCodeValue} size={200} />
          </div>
        )}
        <PrimaryButton
          onClick={handleSave}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-green-500 rounded-md hover:bg-green-700"
        >
          Save
        </PrimaryButton>
      </div>
    </div>
  )
  

export default SettingWallet
