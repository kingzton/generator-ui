import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '@/utils/constant'

/**
 * @author: zxj
 * @date:  2023-01-03 10:51
 * @tags: 代码配置存储
 */

export interface GeneratorState {
  // 当前访问模板
  activeTemplate: TemplateInfo,
  // 模板的历史记录
  historyTemplate: TemplateInfo[],
  // 已有的模板列表
  templateList: TemplateInfo[]
}

export const useGeneratorStore = defineStore({
  id: 'generator',
  state: (): GeneratorState => {
    return {
      activeTemplate: {
        // 模板名称
        name: '',
        // 模板语言
        type: 'html',
        // 模板存储路径
        path: '/',
        // 模板内容
        content: '',
        // 创建时间
        creatTime: dayjs().format(DATE_FORMAT.FULL_TIME),
        // 备注
        remark: ''
      } as TemplateInfo,
      historyTemplate: [],
      templateList: []
    }
  },
  getters: {
    getActiveTemplate(): TemplateInfo {
      return this.activeTemplate
    },
    getTemplateList() : TemplateInfo[]{
      return this.templateList
    },
    getHistory(): TemplateInfo[] {
      return this.historyTemplate
    }
  },
  actions: {
    setActiveTemplate(template: TemplateInfo) {
      this.activeTemplate = template
    },
    addTemplate(template: TemplateInfo) {
      this.templateList.push(template)
    },
    addHistory(template: TemplateInfo) {

    }
  }
})
