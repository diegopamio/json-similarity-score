import Head from 'next/head';
import { Box, Container } from '@material-ui/core';
import React, { useState } from 'react';
import { Header } from '~/components/Header';
import { ScoreAnalysisLogPanel } from '~/components/ScoreAnalysisLog/ScoreAnalysisLogPanel';
import { ControlPanel } from '~/components/ControlPanel';

const Home = () => {
  const [scoringResults, setScoringResults] = useState({});

  const handleScoreChange = (data) => setScoringResults(data);
  return (
    <>
      <Head>
        <title>JSON Similarity Score</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Box mx={{ xs: 0, md: 4 }} mt={2}>
          <ControlPanel onScoreChange={handleScoreChange} />
          {scoringResults.metaData && <ScoreAnalysisLogPanel scoreAnalysisData={scoringResults} />}
        </Box>
      </Container>
    </>
  );
};

export default Home;
