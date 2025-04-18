import { appInfo, applicationBase } from './environment.common';

export const environment = {
  appInfo,
  application: {
    ...applicationBase,
    angular: `${applicationBase.angular} DEV`,
  },
  config: {
    production: false,
    url: 'https://dungeonfinder.onrender.com/api/',
  },
};
