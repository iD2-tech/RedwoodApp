import React from 'react';
import Providers from './navigation';
import { AppProvider, UserProvider, createRealmContext } from '@realm/react';
import Realm from 'realm';
import { RealmProvider } from './database/RealmConfig';


const App = () => {
  return (
    <AppProvider id={'redwood-gdbtd'}>
      <UserProvider fallback={Providers}>
        <RealmProvider
        sync={{
          flexible: true,
          onError: console.error,
          initialSubscriptions: {
            update(subs, realm) {
              subs.add(realm.objects('Post'));
            },
          },
        }}>
          <Providers />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  )
}
export default App;
