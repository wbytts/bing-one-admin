import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import AntdGlobal from './utils/AntdGlobal'
import router from '@/router'
import './App.css'
import '@/styles/dark-vars.scss'

function App() {

  const isDark = false

  const themeConfig = {
    token: {
      colorPrimary: '#ed6c00'
    },
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router}></RouterProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
