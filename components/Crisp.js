import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '13538f0f-96c4-4c63-88c1-6bdb7b3425f3';

    (function () {
      const d = document;
      const s = d.createElement('script');

      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('head')[0].appendChild(s);
    }());
  }, []);

  return null;
};
