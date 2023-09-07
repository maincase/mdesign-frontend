'use client'

import { useQueryInteriors } from '@/api/query-hooks/interior'
import MainSlider from '@/components/MainSlider/MainSlider'
import { useInteriorItems } from '@/state/interior/useInteriorItems'
import { useEffect } from 'react'

export default function Home() {
  const { data: serverInteriors } = useQueryInteriors()

  const { items: interiorItems, setItems: setInteriorItems } = useInteriorItems()

  useEffect(() => {
    // Populate global state from server data on initial page load
    if (serverInteriors && interiorItems.length === 0) {
      setInteriorItems(serverInteriors.pages.flat())
    }
  }, [serverInteriors])

  return <MainSlider interiorItems={interiorItems} />
}
