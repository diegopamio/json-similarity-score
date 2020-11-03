import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Card from '@material-ui/core/Card';
import { CardContent, CardHeader } from '@material-ui/core';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { OptionsContext } from '~/components/ControlPanel/OptionsContext';

export const OptionsAlternatives = ({ optionKey, alternatives }) => {
  const { options, setOptions } = useContext(OptionsContext);
  const handleChange = (event) => {
    setOptions({ ...options, [optionKey]: event.target.value });
  };
  return (

    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="Options"
        name="arrayIndexComparisonSetting"
        value={options[optionKey]}
        onChange={handleChange}
      >
        <Grid container>
          { alternatives.map((alternative) => (
            <Grid key={alternative.value} item xs={12} sm={Math.round(12 / alternatives.length)}>
              <FormControlLabel
                value={alternative.value}
                control={<Radio color="primary" />}
                label={(
                  <Card raised={options[optionKey] === alternative.value}>
                    <CardHeader title={alternative.label} />
                    <CardContent>
                      <img
                        src={`/images/${optionKey}-${alternative.value}.png`}
                        width="100%"
                        alt={`${alternative.label} visualization`}
                      />
                    </CardContent>
                  </Card>
                )}
                labelPlacement="bottom"
              />

            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

OptionsAlternatives.propTypes = {
  optionKey: PropTypes.string.isRequired,
  alternatives: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};
