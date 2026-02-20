const runtimeConfig = window.FIELD_COMMAND_CONFIG || {};

export const config = {
  apiBaseUrl: runtimeConfig.apiBaseUrl || '',
  appOrigin: runtimeConfig.appOrigin || '',
  stripePriceIds: runtimeConfig.stripePriceIds || {},
  walkthroughVideoUrl: runtimeConfig.walkthroughVideoUrl || ''
};
