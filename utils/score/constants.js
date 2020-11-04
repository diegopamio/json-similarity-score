export const SCORING_SETTINGS_KEYS = {
  ARRAY_POSITION_MATCH: 'arrayPositionMatch',
  ELEMENT_WEIGHT: 'elementWeight',
};

export const SCORE_SETTINGS_VALUES = {
  [SCORING_SETTINGS_KEYS.ARRAY_POSITION_MATCH]: {
    FORCE_SAME_POSITION: 'strict',
    MATCH_ANY_POSITION: 'flex',
  },
  [SCORING_SETTINGS_KEYS.ELEMENT_WEIGHT]: {
    SIBLINGS_PROPORTION: 'siblingsProportion',
    DESCENDANTS_COUNT: 'descendantsCount',
  },
};
