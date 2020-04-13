import styles from './app.module'
import React from 'react'
import { hot } from 'react-hot-loader/root'

function App() {
  return (
    <div>
      <h2 className={styles.red}>This is my real React application!</h2>
      <p>YUHUU!!!</p>
    </div>
  )
}

export default hot(App)
