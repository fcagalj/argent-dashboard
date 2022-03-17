import React, { ReactElement } from 'react'
import styles from './index.module.css'

const Layout = ({ children }: { children: JSX.Element }): ReactElement => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout
