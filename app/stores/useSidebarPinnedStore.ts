import { persist } from 'zustand/middleware'
import { create } from 'zustand'

type SidebarPinned = {
  isPinned: boolean
  setIsPinned: (isPinned: boolean) => void
}

export const useSidebarPinnedStore = create<SidebarPinned>()(
  persist(
    (set) => ({
      isPinned: false,
      setIsPinned: (isPinned) => set({ isPinned })
    }),
    {
      name: 'sidebar-pinned'
    }
  )
)
