import React from 'react'
import styles from './index.module.scss'
import { Tabs } from 'antd'

const TabsFC: React.FC = () => {
  return <Tabs
    tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: 'var(--dark-bg-color)' }}
    type='editable-card'
    hideAdd
  />
}

export default TabsFC

