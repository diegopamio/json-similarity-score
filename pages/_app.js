/* eslint-disable react/forbid-prop-types,react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import * as FullStory from '@fullstory/browser';
import dynamic from 'next/dynamic';
import theme from '../styles/theme';

const CommonHead = () => (
  <Head>
    <title>JSON Similarity Score</title>
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    <meta
      name="description"
      content="A simple tool for developers to compare json files, with detailed analysis and overall score."
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
                (function(w, d, s, l, i){
                  w[l] = w[l] || []; w[l].push({
                      'gtm.start':
                          new Date().getTime(), event: 'gtm.js'
                  }); var f = d.getElementsByTagName(s)[0],
                      j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                          'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
                }) (window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
      }}
    />

    <script dangerouslySetInnerHTML={{
      __html: `window.heap=window.heap||[],heap.load=function(e,t) {
                  window.heap.appid=e,window.heap.config=t=t||{};
                    var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");
                    a.type="text/javascript",
                    a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";
                  var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);
                  for(var o=function(e) {
                    return function() {
                      heap.push([e].concat(Array.prototype.slice.call(arguments,0)))
                    }
                  },
                  p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty",
                     "setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])
                };heap.load("${process.env.NEXT_PUBLIC_HEAP_ID}");`,
    }}
    />
    <script
      data-name="BMC-Widget"
      src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
      data-id={process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE_ID}
      data-description="Support me on Buy me a coffee!"
      data-message="If this was helpful for you, you can support me by buying me a coffee"
      data-color="#12b7e3"
      data-position="left"
      data-x_margin="18"
      data-y_margin="18"
    />
  </Head>
);

const CrispWithNoSSR = dynamic(
  () => import('../components/Crisp'),
  { ssr: false },
);

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    FullStory.init({ orgId: process.env.NEXT_PUBLIC_FULLSTORY_ORG_ID });
  }, []);

  return (
    <>
      <CommonHead />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CrispWithNoSSR />
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
