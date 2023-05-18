/**
 * @author: zxj
 * @date:  2022-11-08 16:36
 * @tags:
 */
import dayjs from "dayjs";

export interface AppState {
  title: string
  currentSize: ElementPlusSize
  nowYear: number
}

export const appModules: AppState = {
  title: import.meta.env.VITE_APP_TITLE, // 标题
  currentSize: 'default',
  nowYear: dayjs().year()
}
