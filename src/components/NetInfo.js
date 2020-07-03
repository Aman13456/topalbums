export default {
  fetch: () => {
    return Promise.resolve({
      isInternetReachable: navigator.onLine,
      isConnected: navigator.onLine,
      details: {},
    });
  },
  addEventListener: (listener) => {
    let onlineListener = () => {
      listener({isInternetReachable: true, isConnected: true, details: {}});
    };
    let offlineListener = () => {
      listener({isInternetReachable: false, isConnected: false, details: {}});
    };
    window.addEventListener('online', onlineListener);
    window.addEventListener('offline', offlineListener);
    return () => {
      window.removeEventListener('online', onlineListener);
      window.removeEventListener('offline', offlineListener);
    };
  },
};
