import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root';
import './styles'

const HeaderTitleImage = (props) => {
  return (
    <div className='header-title-image'>
      <div className='bx--grid'>
        <div className='bx--row'>
          <div className='bx--col-sm-4 bx--col-md-4 bx--col-lg-7 bx--col-xlg-6 header-text'>
            <h1 className='title'>{props.title}</h1>
            <p className='subtitle'>{props.subtitle}</p>
          </div>
          <div className='bx--col-sm-4 bx--col-md-4 bx--col-lg-8 bx--offset-lg-1 bx--offset-xlg-2 bx--offset-max-2 bx--aspect-ratio bx--aspect-ratio--16x9 world_globe'>
            <img className='bx--aspect-ratio--object image' src={props.imgSrc} alt={props.imgAlt} />
          </div>
        </div>
      </div>
      <svg width="0" height="0" className="mysvg">
        <defs>
          <clipPath id="home-path-md" clipPathUnits="objectBoundingBox">
            <path d="M0,0 C0.571625665,0 0.82163906,0 0.750040184,0 C0.642641871,0 0.730318556,0.527778707 0.543275552,0.727091633 C0.340397591,0.943278282 0.255345434,0.435258964 0,1 C0,1 0,0.666666667 0,0 Z"></path>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

HeaderTitleImage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired
}

export default hot(HeaderTitleImage);
