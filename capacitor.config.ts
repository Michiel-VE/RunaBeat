import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fi.kwallie.runabeat',
  appName: 'runabeat',
  webDir: 'dist/runabeat',
  bundledWebRuntime: false,
  plugins: {
    "GoogleAuth": {
      "scopes": ["profile", "email"],
      "serverClientId": "942246819595-2oq16lrplfmf6fcrsir4317ufb91dlvl.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
};


export default config;
