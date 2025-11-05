import React, { type SetStateAction } from 'react'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { Dices } from 'lucide-react'

interface Props {
  isGeneratingData: boolean
  setIsGeneratingData: (value: SetStateAction<boolean>) => void
  handleGenerateRandomData: () => void
}

export default function GenerateRandomData({ isGeneratingData, setIsGeneratingData, handleGenerateRandomData }: Props) {
  return (
    <Button
      className='cursor-pointer'
      onClick={() => {
        setIsGeneratingData(true)
        handleGenerateRandomData()
      }}
      disabled={isGeneratingData}
    >
      {isGeneratingData && <Spinner />}
      <span>{isGeneratingData ? 'Generating...' : 'Generate random data'}</span>
      {!isGeneratingData && <Dices />}
    </Button>
  )
}
