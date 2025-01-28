export const useSessionStorage = (key) => {
    const setSessionStorage = (data) =>
      sessionStorage.setItem(key, JSON.stringify(data));
  
    const getSessionStorage = JSON.parse(sessionStorage.getItem(key))?.access_token;
  
    const removeSessionStorage = () => sessionStorage.removeItem(key);
  
    return { setSessionStorage, getSessionStorage, removeSessionStorage };
  };
  