import { Suspense, FC, LazyExoticComponent, ReactNode } from 'react'
import { Spin } from 'antd'

export const lazyLoad = (Component: LazyExoticComponent<FC>): ReactNode => {

  // 加载条样式
  const spinStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }

  return (
    <Suspense fallback={<Spin size="large" style={spinStyle} />}>
      <Component></Component>
    </Suspense>
  )
}
