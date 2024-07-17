import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme, App as AntdApp, ThemeConfig } from 'antd'
import AntdGlobal from './utils/AntdGlobal'
import router from '@/router'
import './App.css'
import '@/styles/dark-vars.scss'

function App() {

  const isDark = false

  const antdThemeConfig: ThemeConfig = {
    // 定制全局token
    token: {
      colorPrimary: '#ed6c00',
    },
    // 定制组件token
    components: {
      Layout: {
        lightSiderBg: "skyblue", // 亮色主题侧边栏背景色
      },
      Menu: {},
    },
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
  }

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <AntdApp>
        <AntdGlobal/>
        <RouterProvider router={router}></RouterProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App;
