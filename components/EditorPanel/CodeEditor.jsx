import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const AceEditor = dynamic(
  async () => {
    const reactAce = await import('react-ace');

    await import('ace-builds/src-min-noconflict/ext-language_tools');
    await import('ace-builds/src-min-noconflict/mode-json');
    await import('ace-builds/src-min-noconflict/theme-github');
    const ace = await import('ace-builds/src-min-noconflict/ace');
    ace.config.set(
      'basePath',
      'https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/',
    );
    ace.config.setModuleUrl(
      'ace/mode/javascript_worker',
      'https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-javascript.js',
    );

    return reactAce;
  },
  {
    ssr: false, // react-ace doesn't support server side rendering as it uses the window object.
  },
);

export const CodeEditor = ({ json, name, onChange }) => (
  <AceEditor
    mode="json"
    value={json}
    theme="github"
    name={name}
    onChange={onChange}
    width="100%"
    editorProps={{ $blockScrolling: true }}
  />
);

CodeEditor.propTypes = {
  json: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
