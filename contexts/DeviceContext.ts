import { createContext, useContext } from 'react';

const DeviceContext = createContext('');

export const useDeviceId = () => useContext(DeviceContext);

export const DeviceContextProvider = DeviceContext.Provider;
