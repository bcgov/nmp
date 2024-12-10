/**
 * @summary context provider for app data
 */
import { createContext, ReactNode } from 'react';
import BaseProvider from './BaseProvider';
import { initialState, reducer } from '../services/app/AppReducer';

export const AppContext = createContext(initialState);

type AppProviderProps = {
  children: ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  return (
    <BaseProvider
      Context={AppContext}
      initialState={initialState}
      reducer={reducer}
    >
      {children}
    </BaseProvider>
  );
}

export default AppProvider;
