import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CollapsiblePanel } from '~/components/CollapsiblePanel';
import { JsonFilesContext } from '~/contexts/JsonFilesContext';
import { CodeEditor } from '~/components/EditorPanel/CodeEditor';

const getStandardBorder = (theme) => ({
  borderStyle: 'solid',
  borderColor: theme.palette.primary.main,
});

const useStyles = makeStyles((theme) => ({
  editorLeft: {
    borderRightWidth: 0,
    ...getStandardBorder(theme),
  },
  editorRight: {
    borderLeftWidth: 1,
    ...getStandardBorder(theme),
  },
}));

export const EditorPanel = () => {
  const classes = useStyles();
  const {
    jsonA, jsonB, setJsonA, setJsonB,
  } = useContext(JsonFilesContext);

  const files = [
    { name: 'Left', json: jsonA, setJson: setJsonA },
    { name: 'Right', json: jsonB, setJson: setJsonB },
  ];

  return (
    <CollapsiblePanel separator title="Edit JSONs">
      <Grid container spacing={0}>
        {
          files.map(({ name, json, setJson }) => (
            <Grid key={name} item xs={12} sm={6} className={classes[`editor${name}`]}>
              <CodeEditor json={json} onChange={setJson} name={name} />
            </Grid>
          ))
        }
      </Grid>
    </CollapsiblePanel>
  );
};
