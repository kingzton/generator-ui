import { defineStore } from 'pinia'
import { store } from '@/store'
import { appModules, AppState } from '@/types/app'

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => appModules,
  persist: {
    enabled: true,
  },
  getters: {
    getTitle(): string {
      return this.title
    },
    getNowYear(): number {
      return this.nowYear
    },
  },
  actions: {
    setTitle(title: string) {
      this.title = title
    },
    setNowYear(nowYear: number) {
      this.nowYear = nowYear
    },
  },
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
