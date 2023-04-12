import Realm from 'realm';


export class Post extends Realm.Object {
    _id;
    user;
    title;
    book;
    chapter;
    verse;
    bibleVerses;
    text;
    username;
    likes;
    comments;
    createdAt;

    static generate(user, title, book, chapter, verse, bibleVerses, text, username) {
        return {
            _id: new Realm.BSON.ObjectID(),
            user,
            title,
            book,
            chapter,
            verse,
            bibleVerses,
            text,
            username,
            likes: [],
            comments: [],
            createdAt: new Date(),
        }
    }

    static schema = {
        name: 'Post',
        primaryKey: '_id',
        properties: {
            user: 'string',
            _id: 'objectId',
            title: 'string',
            book: 'string',
            chapter: 'string',
            verse: 'string',
            bibleVerses: 'string',
            text: 'string',
            username: 'string',
            likes: 'string[]',
            comments: 'string[]',
            createdAt: 'date'
        },
    };
};
export default Post;