import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type ConfettiStateType = { runConfetti: boolean; setRunConfetti: (runConfetti: boolean) => void }

export type AppStateProps = ConfettiStateType

export const useAppState = create<AppStateProps>()(
  immer((set) => ({
    // Managing state for confetti animation
    runConfetti: false,
    setRunConfetti: (runConfetti: boolean) => set({ runConfetti }),
  }))
)
