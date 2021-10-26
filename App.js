import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import AuthPageNavigations from './navigations/authPageNavigations';
import RootNavigations from './navigations/rootNavigations';
import { getUserToken } from "./functions/storageFunc"
import { checkUserToken } from './components/common/function/restApi';
import { Alert } from 'react-native';

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-AuthStack-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-AuthStack-token' });
      },
    }),
    []
  );
  const AuthContext = React.createContext(authContext);

  
  const { signIn, signOut } = useContext(AuthContext);

  const checkToken = async () => {
    const isTokenExist = await checkUserToken();
    if (isTokenExist) {
      signIn();
    } else {
      signOut();
    }
  }
  React.useEffect(() => {
    checkToken();
  }, [])

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
            <AuthContext.Provider value={authContext}>
              {state.userToken ?
                <RootNavigations ctx={AuthContext} />
                :
                <AuthPageNavigations ctx={AuthContext} />
              }
            </AuthContext.Provider>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;
