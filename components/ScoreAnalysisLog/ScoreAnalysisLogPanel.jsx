import React from 'react';
import * as PropTypes from 'prop-types';
import { TreeView } from '@material-ui/lab';
import TreeItem from '@material-ui/lab/TreeItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {
  useMediaQuery, useTheme,
} from '@material-ui/core';
import { TreeItemLabel } from '~/components/ScoreAnalysisLog/TreeItemLabel';
import { CollapsiblePanel } from '~/components/CollapsiblePanel';

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <CollapsiblePanel title={`${matches ? 'Comparison ' : ' '} Analysis`}>
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
      >
        {buildTree('root', scoreAnalysisData)}
      </TreeView>
    </CollapsiblePanel>
  );
};

ScoreAnalysisLogPanel.propTypes = {
  scoreAnalysisData: PropTypes.shape({
    matched: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};
