declare type ElementPlusSize = 'default' | 'small' | 'large'

declare type ElementPlusInfoType = 'success' | 'info' | 'warning' | 'danger'

declare type Nullable<T> = T | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

// 配置弹窗信息
declare interface DialogModel {
  visible: boolean
  actionType: string
  title: string
  width: number
  height: number
  // 判断按钮是否显示，以及协助关闭弹窗
  close: boolean
  footer: boolean
}

declare interface MenuModel {
  key: string
  path: string
  name: string
  custom: string
  title: string
}

declare interface TemplateInfo {
  id?: string
  // 模板名称
  name: string
  // 模板语言
  type: string
  // 模板存储路径
  path: string
  // 模板内容
  content: string
  // 创建时间
  creatTime: string
  // 修改时间
  updateTime: string
  // 备注
  remark: string
}

declare interface Page<T = any> {
  // 当前页数
  current: number
  // 每页条数
  pageSize: number
  // 总数据条数
  total?: number
  // 数据
  data?: T extends any ? T : T & any
}

declare const enum ResponseCode {
  success = 100,
  fail = 200,
  auth_error = 400,
  net_error = 500
}

declare const enum ResponseMessage {
  success = '成功',
  fail = '失败',
  auth_error = '授权失败',
  net_error = '网络错误'
}

declare interface IResponse<T = any> {
  // 状态码
  code: string | ResponseCode
  // 结果
  data: T extends any ? T : T & any
  // 消息
  message?: string | ResponseMessage
}
