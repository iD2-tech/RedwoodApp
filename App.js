import React from 'react';
import Providers from './navigation';
import { AppProvider, UserProvider, createRealmContext } from '@realm/react';
import Realm from 'realm';
import { RealmProvider } from './database/RealmConfig';


const App = () => {
  return (
    <AppProvider id={'redwood-gdbtd'}>
      <UserProvider fallback={Providers}>
        <RealmProvider>
          <Providers />
        </RealmProvider>
      </UserProvider>


    </AppProvider>

  )
}
export default App;
