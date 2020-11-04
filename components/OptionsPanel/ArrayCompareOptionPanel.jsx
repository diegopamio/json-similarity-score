import React from 'react';
import PropTypes from 'prop-types';
import { OptionsTabPanel } from '~/components/OptionsPanel/OptionsTabPanel';
import { SCORE_SETTINGS_VALUES, SCORING_SETTINGS_KEYS } from '~/utils/score/constants';

const { ARRAY_POSITION_MATCH } = SCORING_SETTINGS_KEYS;
const { FORCE_SAME_POSITION, MATCH_ANY_POSITION } = SCORE_SETTINGS_VALUES[ARRAY_POSITION_MATCH];

const alternatives = [
  { label: 'Disregard Array Index', value: MATCH_ANY_POSITION },
  { label: 'Force equal Index', value: FORCE_SAME_POSITION },
];

const explanation = 'This setting determines whether arrays inside the JSON files are compared following their index,'
  + ' or if they are all compare to each other to find the best match, considering arrays are non-sorted by'
  + ' nature and thus, they may be considered EQUAL when their equal elements are positioned at different'
  + ' indexes.';

export const ArrayCompareOptionPanel = ({ value, index }) => (
  <OptionsTabPanel
    value={value}
    index={index}
    explanation={explanation}
    alternatives={alternatives}
    optionKey={ARRAY_POSITION_MATCH}
  />
);

ArrayCompareOptionPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
