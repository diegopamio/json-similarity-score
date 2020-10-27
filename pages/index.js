import Head from 'next/head';
import {
  Box, Button, Container, Grid,
} from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import CompareIcon from '@material-ui/icons/Compare';
import { JsonFileDropContainer } from '~/components/JsonFileDropContainer';
import { Header } from '~/components/Header';
import { ScoreCard } from '~/components/ScoreCard';

const handleChange = (setJson) => (files) => {
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setJson(reader.result);
    };
    reader.readAsText(file);
  });
};

const Home = () => {
  const [jsonA, setJsonA] = useState();
  const [jsonB, setJsonB] = useState();
  const [score, setScore] = useState();

  const compare = () => {
    axios
      .post('/api/score', { jsonA, jsonB })
      .then(({ data }) => {
        setScore(data.scoreNumber);
      })
      .catch((err) => {
        console.log('error in request', err); // ToDo: properly catch errors.
      });
  };

  return (
    <>
      <Head>
        <title>JSON Similarity Score</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Box m={4}>
          <Grid container spacing={2} justify="center">
            <Grid xs={4} item>
              <JsonFileDropContainer
                onChange={handleChange(setJsonA)}
                text="File A"
              />
            </Grid>
            <Grid xs={4} item>
              <JsonFileDropContainer
                onChange={handleChange(setJsonB)}
                text="File B"
              />
            </Grid>
            <Grid xs={3} item>
              <Button fullWidth variant="contained" color="primary" onClick={compare} disabled={!jsonA || !jsonB}>
                <CompareIcon />
                Compare
              </Button>
              <ScoreCard score={score} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
