/**
 * 给 window 上新增的全局变量说明类型
 */
interface Window {
  BMapGL: {
    [propName: string]: any
  }
  BMapGLLib: any
  BMapLib: any
}
