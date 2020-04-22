import styles from './_styles'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import Image from '../../images/rosa'

function HeaderTitleImage() {
  return (
    <div className='header-title-image'>
      <h1>All1Map</h1>
      <img src={Image} alt="Rosa Malagueña" height="200" />
    </div>
  )
}

export default hot(HeaderTitleImage)
