export const isWebOnly = !(window.location.hostname.startsWith('store')) &&
  !(window.location.hostname.startsWith('development'));
