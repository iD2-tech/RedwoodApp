import Post from './Models/Post.js';
import { createRealmContext } from '@realm/react';

const realmConfig = {
    schema: [Post],

    // ONLY USED FOR DEVELOPMENT, DELETE THIS LATER
    deleteRealmIfMigrationNeeded: true
};
const {RealmProvider, useRealm, useQuery, useObject} = createRealmContext(realmConfig);

export {RealmProvider, useRealm, useQuery, useObject};