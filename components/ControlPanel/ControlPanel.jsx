import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import CompareIcon from '@material-ui/icons/Compare';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { JsonFileDropContainer } from '~/components/JsonFileDropContainer';
import { ScoreCard } from '~/components/ScoreCard';
import { OptionsPanel } from '~/components/OptionsPanel/OptionsPanel';
import { DEFAULT_OPTIONS } from '~/utils/score/calculateScore';
import { OptionsProvider } from '~/components/ControlPanel/OptionsContext';

export const ControlPanel = ({ onScoreChange }) => {
  const [jsonA, setJsonA] = useState();
  const [jsonB, setJsonB] = useState();
  const [scoringResults, setScoringResults] = useState({});
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [errorMessage, setErrorMessage] = useState('');

  const dismissErrorMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorMessage('');
  };

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
      .post('/api/score', { jsonA, jsonB, options: JSON.stringify(options) })
      .then(({ data }) => {
        setScoringResults(data);
        onScoreChange(data);
      })
      .catch((err) => {
        setErrorMessage(err.response?.data || err.messageData);
      });
  };

  return (
    <OptionsProvider value={{ options, setOptions }}>
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
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={errorMessage.length > 0}
            onClose={dismissErrorMessage}
            autoHideDuration={6000}
          >
            <Alert severity="error" onClose={dismissErrorMessage}>
              {errorMessage}
            </Alert>
          </Snackbar>
          <ScoreCard score={scoringResults.scoreNumber} />
        </Grid>
      </Grid>
      <OptionsPanel />
    </OptionsProvider>
  );
};

ControlPanel.propTypes = {
  onScoreChange: PropTypes.func,
};

ControlPanel.defaultProps = {
  onScoreChange: () => {},
};
