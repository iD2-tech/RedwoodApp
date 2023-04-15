import Post from './Models/Post.js';
import { createRealmContext } from '@realm/react';

const realmConfig = {
    schema: [Post],
};
const {RealmProvider, useRealm, useQuery, useObject} = createRealmContext(realmConfig);

export {RealmProvider, useRealm, useQuery, useObject};