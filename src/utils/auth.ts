const TOKEN_KEY = 'token';

const getTokenFromStorage = (): string => localStorage.getItem(TOKEN_KEY);

const addTokenToStorage = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeTokenFromStorage = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export { getTokenFromStorage, addTokenToStorage, removeTokenFromStorage };
