import { appInfo, applicationBase } from './environment.common';

export const environment = {
  appInfo,
  application: {
    ...applicationBase,
    angular: `${applicationBase.angular} HML`,
  },
  config: {
    production: false,
    url: 'http://localhost:5000/api/',
  },
};
