import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default function Home() {
  const [jsonA, setJsonA] = useState();
  const [jsonB, setJsonB] = useState();
  const [score, setScore] = useState('N/A');

  const handleChange = (setJson) => (files) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setJson(reader.result);
      };
      reader.readAsText(file);
    });
  };

  const compare = () => {
    axios
      .post('/api/score', {
        jsonA,
        jsonB,
      })
      .then(({ data }) => {
        setScore(`${(data.scoreNumber * 100).toFixed(2)}%`);
      })
      .catch((err) => {
        console.log('error in request', err); // ToDo: properly catch errors.
      });
  };

  return (
    <Container maxWidth="sm">
      <Head>
        <title>JSON Similarity Score</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          JSON Similarity Score
        </Typography>
      </Box>
      <Grid container spacing={2} justify="center">
        <Grid xs={4} item>
          <Card>
            <DropzoneArea
              onChange={handleChange(setJsonA)}
              useChipsForPreview
              dropzoneText="File A"
              filesLimit={0}
              getFileAddedMessage={(fileName) => `${fileName} successfully added.`}
              previewGridProps={{ container: { justify: 'center', direction: 'row' } }}
              acceptedFiles={['application/json']}
            />
          </Card>
        </Grid>
        <Grid xs={4} item>
          <Button variant="contained" color="primary" onClick={compare} disabled={!jsonA || !jsonB}>
            Compare
          </Button>
          <Box>
            Score:
            {' '}
            {score}
          </Box>
        </Grid>
        <Grid xs={4} item>
          <Card>
            <DropzoneArea
              onChange={handleChange(setJsonB)}
              useChipsForPreview
              dropzoneText="File B"
              filesLimit={0}
              getFileAddedMessage={(fileName) => `${fileName} successfully added.`}
              previewGridProps={{ container: { justify: 'center', direction: 'row' } }}
              acceptedFiles={['application/json']}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>

  );
}
