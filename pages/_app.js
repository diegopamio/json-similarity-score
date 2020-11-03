/* eslint-disable react/forbid-prop-types,react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import theme from '../styles/theme';

const CommonHead = () => (
  <Head>
    <title>JSON Similarity Score</title>
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    <meta
      name="description"
      content="A simple tool for developers to compare json files, with detailed analysis and overall score."
    />
  </Head>
);

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <CommonHead />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GitHubForkRibbon href="//github.com/diegopamio/json-similarity-score" target="_blank">
          Fork me on GitHub
        </GitHubForkRibbon>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
