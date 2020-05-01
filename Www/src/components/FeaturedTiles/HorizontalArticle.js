import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root';
import { ClickableTile } from "carbon-components-react/es/components/Tile";
import './horizontal-article_styles'

const HorizontalArticle = (props) => {
  return (
    <div className='bx--article-card-horizontal'>
      <ClickableTile
        href='#'
      >
        <div className='bx--article-card__img bx--aspect-ratio bx--aspect-ratio--16x9'>
          <img className='bx--aspect-ratio--object image' src={props.imgSrc} alt='' />
        </div>
        <div className='bx--article-card__details'>
          <h3 className='bx--article-card-title'>{props.title}</h3>
          <p className='bx--article-card-subtitle'>{props.subtitle}</p>
          <p className='bx--article-card-author-date'>{props.authorDate}</p>
        </div>
      </ClickableTile>
    </div>
  );
};

HorizontalArticle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  authorDate: PropTypes.string.isRequired,
  imgSrc: PropTypes.string
}

export default hot(HorizontalArticle);
