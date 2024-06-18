import React from 'react'
import styles from './index.module.scss'

const NavHeader: React.FC = () => {
  return <div className={styles.navHeader}>
    <div className={styles.left}>
      <div>
        这是头部
      </div>
    </div>
    <div className='right'>
      这是头部右边
    </div>
  </div>
}

export default NavHeader

