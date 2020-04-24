import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'
import HorizontalArticle from './HorizontalArticle'
import VerticalArticle from './VerticalArticle'

const FeaturedTiles = (props) => {
  if (props.align === 'horizontal'){

    const horizontalArticles = props.articles.map( (article,key) => {
      return(
        <div className='bx--col-sm-4' key={key}>
          <HorizontalArticle
            title={article.title}
            subtitle={article.subtitle}
            authorDate={article.authorDate}
            imgSrc={article.imgSrc}
          />
        </div>
      );
    });

    return (
      <div className='bx--row bx--articles'>
        {horizontalArticles}
      </div>
    );

  } else if (props.align === 'vertical'){

    const verticalArticles = props.articles.map( (article,key) => {
      return(
        <div className='bx--col-sm-4 bx--col-md' key={key}>
          <VerticalArticle
            title={article.title}
            subtitle={article.subtitle}
            authorDate={article.authorDate}
            imgSrc={article.imgSrc}
          />
        </div>
      );
    });

    return (
      <div className='bx--row bx--articles'>
        {verticalArticles}
      </div>
    );
  } else {
    return (null);
  }
};

FeaturedTiles.propTypes = {
  align: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  articles: PropTypes.array.isRequired,
}

export default hot(FeaturedTiles);
