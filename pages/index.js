import Head from 'next/head';
import { Box, Container } from '@material-ui/core';
import React, { useState } from 'react';
import { Header } from '~/components/Header';
import { ScoreAnalysisLogPanel } from '~/components/ScoreAnalysisLog/ScoreAnalysisLogPanel';
import { ControlPanel } from '~/components/ControlPanel/ControlPanel';
import { EditorPanel } from '~/components/EditorPanel/EditorPanel';
import { JsonFilesContext } from '~/contexts/JsonFilesContext';

const Home = () => {
  const [scoringResults, setScoringResults] = useState({});
  const [jsonA, setJsonA] = useState();
  const [jsonB, setJsonB] = useState();
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
          <JsonFilesContext.Provider value={{
            jsonA, jsonB, setJsonA, setJsonB,
          }}
          >
            <ControlPanel onScoreChange={handleScoreChange} />
            {scoringResults.metaData && <ScoreAnalysisLogPanel scoreAnalysisData={scoringResults} />}
            <EditorPanel jsonA={jsonA} jsonB={jsonB} />
          </JsonFilesContext.Provider>
        </Box>
      </Container>
    </>
  );
};

export default Home;
