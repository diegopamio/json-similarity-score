import Card from '@material-ui/core/Card';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyTwoTone';

const useStyles = makeStyles((theme) => ({
  dropzone: {
    minHeight: '235px',
    border: 'none',
    '& p': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    backgroundColor: theme.palette.background.accent,
    '& .MuiDropzoneArea-icon': {
      color: theme.palette.primary.main,
    },
  },
}));

export const JsonFileDropContainer = ({ onChange, text }) => {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <DropzoneArea
        onChange={onChange}
        useChipsForPreview
        dropzoneText={text}
        filesLimit={0}
        Icon={FileCopyTwoToneIcon}
        dropzoneClass={classes.dropzone}
        getFileAddedMessage={(fileName) => `${fileName} successfully added.`}
        previewGridProps={{ container: { justify: 'center', direction: 'row' } }}
        acceptedFiles={['application/json']}
      />
    </Card>
  );
};

JsonFileDropContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
