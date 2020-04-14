import styles from './app.module'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import Image from './images/rosa'

function App() {
  return (
    <>
      <img src={Image} alt="Rosa Malagueña" height="200" />
      <h2 className={styles.red}>This is my real React application!</h2>
      <p>YUHUU!!!</p>
    </>
  )
}

export default hot(App)
