import Realm from 'realm';


export class Post extends Realm.Object {
    _id;
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

    static generate(title, book, chapter, verse, bibleVerses, text, username) {
        return {
            _id: new Realm.BSON.ObjectID(),
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