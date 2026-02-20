const runtimeConfig = window.FIELD_COMMAND_CONFIG || {};

export const config = {
  apiBaseUrl: runtimeConfig.apiBaseUrl || '',
  appOrigin: runtimeConfig.appOrigin || window.location.origin,
  stripePriceIds: runtimeConfig.stripePriceIds || {},
  walkthroughVideoUrl: runtimeConfig.walkthroughVideoUrl || ''
};
