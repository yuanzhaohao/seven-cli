import '../themes/index.less';

import React from 'react';
import { render } from 'react-dom';
import Page from '../components/Page';
import { Provider } from 'mobx-react';
import stores from '../stores';

render(
  <Provider {...stores}>
    <Page />
  </Provider>,
  document.getElementById('app')
);
