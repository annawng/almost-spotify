import { createContext, useContext } from 'react';

const AuthContext = createContext('');

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = AuthContext.Provider;
