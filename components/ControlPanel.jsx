import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import CompareIcon from '@material-ui/icons/Compare';
import PropTypes from 'prop-types';
import { JsonFileDropContainer } from '~/components/JsonFileDropContainer';
import { ScoreCard } from '~/components/ScoreCard';

export const ControlPanel = ({ onScoreChange }) => {
  const [jsonA, setJsonA] = useState();
  const [jsonB, setJsonB] = useState();
  const [scoringResults, setScoringResults] = useState({});

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
      .post('/api/score', { jsonA, jsonB })
      .then(({ data }) => {
        setScoringResults(data);
        onScoreChange(data);
      })
      .catch((err) => {
        console.log('error in request', err); // ToDo: properly catch errors.
      });
  };

  return (
    <Grid container spacing={2} justify="center">
      {
        [{ name: 'File  A', setJsonFn: setJsonA }, { name: 'File  B', setJsonFn: setJsonB }]
          .map((dropzone) => (
            <Grid xs={12} sm={6} md={4} item key={dropzone.name}>
              <JsonFileDropContainer onChange={handleChange(dropzone.setJsonFn)} text={dropzone.name} />
            </Grid>
          ))
      }
      <Grid md={3} xs={12} item>
        <Button fullWidth variant="contained" color="primary" onClick={compare} disabled={!jsonA || !jsonB}>
          <CompareIcon />
          Compare
        </Button>
        <ScoreCard score={scoringResults.scoreNumber} />
      </Grid>
    </Grid>
  );
};
ControlPanel.propTypes = {
  onScoreChange: PropTypes.func,
};

ControlPanel.defaultProps = {
  onScoreChange: () => {},
};
