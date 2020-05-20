import './styles'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import BigFooter from '../../components/BigFooter'
import HeaderTitleImage from '../../components/HeaderTitleImage'
import FeaturedTiles from '../../components/FeaturedTiles'
import { Link } from 'react-router-dom';

const Home = () => {


  return (
    <>
      <HeaderTitleImage
        title='All1Map'
        subtitle='A catalog of useful tools to inspire, discover, and enjoy with real data visualisations and maps'
      />
      <FeaturedTiles
        align='horizontal'
        articles= {[
          {
            title: 'COVID-19',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            authorDate: 'Jose Alberto, May 2020',
            coverText: 'COVID-19',
            twitter: true,
            maps: true,
            charts: true
          }
        ]}
      />
      <BigFooter />
    </>
  );
};

export default hot(Home);
