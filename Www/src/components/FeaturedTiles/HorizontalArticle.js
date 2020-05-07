import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root';
import { ClickableTile } from "carbon-components-react/es/components/Tile";
import './horizontal-article_styles';
import Twitter20 from "@carbon/icons-react/lib/light/20";
import Activity20 from "@carbon/icons-react/lib/activity/20";
import Location20 from "@carbon/icons-react/lib/map/20";

const HorizontalArticle = (props) => {

  var icons = [];
  if (props.twitter) icons.push(<Twitter20 />);
  if (props.maps) icons.push(<Location20 />);
  if (props.charts) icons.push(<Activity20 />);

  return (
    <div className='bx--article-card-horizontal'>
      <ClickableTile
        href='#'
      >
        <div className='bx--article-card__img bx--aspect-ratio bx--aspect-ratio--16x9'>
          <div className='bx--aspect-ratio--object cover'>
            <span>{props.coverText}</span>
            {icons}
          </div>
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
  subtitle: PropTypes.string.isRequired,
  authorDate: PropTypes.string.isRequired,
  coverText: PropTypes.string.isRequired,
  twitter: PropTypes.bool,
  maps: PropTypes.bool,
  charts: PropTypes.bool
}

export default hot(HorizontalArticle);
