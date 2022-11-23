export const clearStorage = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.clear();
    localStorage.clear();
  }
};
