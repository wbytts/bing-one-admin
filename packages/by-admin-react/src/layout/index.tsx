import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Watermark } from "antd"
import { useStore } from "@/store"
import styles from "./index.module.scss"
import Menu from "@/components/Menu"
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Tabs from '@/components/TabsFC'

const { Content, Sider } = Layout

const AppLayout: FC = () => {

  const { collapsed } = useStore()

  return (
    // 全局水印
    <Watermark content="炳翰牛逼">
      <Layout>
        {/* 侧边栏 */}
        <Sider collapsed={collapsed}>
          <Menu />
        </Sider>
        {/* 内容区 */}
        <Content>
          <Layout>
            {/* 头部 */}
            <NavHeader />
            {/* 标签卡 */}
            <Tabs />
            {/* 内容区域容器 */}
            <div className={styles.content}>
              <div className={styles.wrapper}>
                {/* 内容路由区域 */}
                <Outlet></Outlet>
              </div>
              {/* 底部 */}
              <NavFooter />
            </div>
          </Layout>
        </Content>
      </Layout>
    </Watermark>
  )
}

export default AppLayout

