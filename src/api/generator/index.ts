import { db } from '@/utils/db'

/**
 * @author: zxj
 * @date:  2023-02-22 11:28
 * @tags:
 */
export const getListApi = async (data: Page): Promise<IResponse> => {
  let { current, pageSize } = data
  let offset = current > 0 ? current * pageSize : 0
  let total = await db.templateInfo.count()
  let page: Page = { data: undefined, current, pageSize, total }
  page.data = await db.templateInfo.offset(offset).limit(pageSize).toArray()
  return { code: ResponseCode.success, data: page, message: '' }
}

export const insertApi = async (data: TemplateInfo): Promise<IResponse> => {
  let result = await db.templateInfo.add(data)
  return {
    code: result ? ResponseCode.success : ResponseCode.fail,
    data: result,
    message: result ? ResponseMessage.success : ResponseMessage.fail
  }
}

export const updateApi = async (data: TemplateInfo): Promise<IResponse> => {
  // @ts-ignore
  let result = await db.templateInfo.update(data.id, data)
  return {
    code: result ? ResponseCode.success : ResponseCode.fail,
    data: result,
    message: result ? ResponseMessage.success : ResponseMessage.fail
  }
}
// AyaSwan、Karbo、CrimsonRed
export const updateByNameApi = async (data: TemplateInfo): Promise<IResponse> => {
  let result = await db.templateInfo.where('name').equals(data.name).modify(data)
  return {
    code: result ? ResponseCode.success : ResponseCode.fail,
    data: result,
    message: result ? ResponseMessage.success : ResponseMessage.fail
  }
}

export const deleteApi = async (data: number): Promise<IResponse> => {
  try {
    await db.templateInfo.delete(data)
    return {
      code: ResponseCode.success,
      data: null,
      message: ResponseMessage.success
    }
  } catch (e) {
    return {
      code: ResponseCode.fail,
      data: null,
      message: ResponseMessage.fail
    }
  }
}
export const getApi = async (data: number): Promise<IResponse> => {
  let result = await db.templateInfo.get(data)
  return {
    code: result ? ResponseCode.success : ResponseCode.fail,
    data: result,
    message: result ? ResponseMessage.success : ResponseMessage.fail
  }
}
