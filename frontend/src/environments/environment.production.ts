import { appInfo, applicationBase } from './environment.common';

export const environment = {
  appInfo,
  application: {
    ...applicationBase,
    angular: `${applicationBase.angular} PROD`,
  },
  config: {
    production: true,
    url: 'http://localhost:5000/api/',
  },
};
