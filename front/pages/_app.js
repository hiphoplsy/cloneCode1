import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withReduxSaga from 'next-redux-saga';

import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  )
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(withReduxSaga(NodeBird));