import React from 'react';
import * as PropTypes from 'prop-types';
import { TreeView } from '@material-ui/lab';
import TreeItem from '@material-ui/lab/TreeItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { TreeItemLabel } from '~/components/ScoreAnalysisLog/TreeItemLabel';

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

}));

const buildTree = (path, {
  metaData, matched, count, children,
}) => (
  <TreeItem
    key={metaData.key}
    nodeId={`${path}/${metaData.key}`}
    label={<TreeItemLabel metaData={metaData} matched={matched} count={count} />}
  >
    { children?.map((childNode) => buildTree(`${path}/${metaData.key}`, childNode))}
  </TreeItem>
);

/**
 * Renders a score analysis treeview
 * @param score a 0..1 / undefined score, unformatted.
 * @return {JSX.Element} a Card element, with title and subtitle. If the value is not present, it gets rendered as "N/A"
 * @constructor
 */
export const ScoreAnalysisLogPanel = ({
  scoreAnalysisData,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={11}>
        <Card variant="outlined" widt={100} height="500px">
          <CardHeader
            title="Comparison Analysis"
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

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <TreeView
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
              >
                {buildTree('root', scoreAnalysisData)}
              </TreeView>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
};

ScoreAnalysisLogPanel.propTypes = {
  scoreAnalysisData: PropTypes.shape({
    matched: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};
