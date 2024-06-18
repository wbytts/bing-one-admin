// 接口类型定义

/**
 * 通用接口返回结果类型
 */
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

/**
 * 常用返回data类型
 */
export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

/**
 * 分页参数类型
 */
export interface PageParams {
  pageNum: number
  pageSize?: number
}
