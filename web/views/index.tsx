import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import moment from 'moment';
import getLang from '@utils/getLang';
import T from '@services/translation.services';
import { __APP_BASENAME__ } from '@constants/global';
import './styles/style.global.scss';
import './styles/style.global.spacing.scss';
import AppProvidersContainer from '@contextApi/index';
import App from '../App';

const Main = () => {
  const lang = getLang();

  T.init(lang); // init app with language
  moment.locale(lang);

  return (
    <BrowserRouter basename={__APP_BASENAME__}>
      <AppProvidersContainer>
        <App />
      </AppProvidersContainer>
    </BrowserRouter>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
