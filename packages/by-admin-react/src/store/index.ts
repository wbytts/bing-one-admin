import { create } from 'zustand'
import storage from '@/utils/storage'

interface IStore {
  // Token
  token: string
  updateToken: (token: string) => void

  // 暗色风格
  isDark: boolean
  updateTheme: (isDark: boolean) => void

  // 侧边栏是否收起
  collapsed: boolean
  updateCollapsed: () => void
}

export const useStore = create<IStore>(set => ({
  token: '',
  updateToken: token => set({ token }),

  isDark: storage.get('isDark') || false,
  updateTheme: isDark => set({ isDark }),

  collapsed: false,
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed }))
}))

