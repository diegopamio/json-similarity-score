import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent, CardHeader } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  header: {
    paddingBottom: 0,
    alignItems: 'baseline',
    minHeight: 64,
  },
  contentWithSeparator: {
    borderTopColor: theme.palette.divider,
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
  },
}));

export const CollapsiblePanel = ({
  separator, title, children, onToggle,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    onToggle(!expanded);
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} md={11}>
        <Card variant="outlined" widt={100} height="500px">
          <CardHeader
            title={title}
            className={classes.header}
            action={(
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {' '}
                <ExpandMoreIcon />
              </IconButton>
            )}
          />

          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            className={separator ? classes.contentWithSeparator : ''}
          >
            <CardContent>
              {children}
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Grid>

  );
};

CollapsiblePanel.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  separator: PropTypes.bool,
  onToggle: PropTypes.func,
};

CollapsiblePanel.defaultProps = {
  separator: false,
  onToggle: () => {},
};
