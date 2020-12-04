import firebase from "firebase/app";

const getCollection = () => {
    const db = firebase.firestore();
    return db.collection("posts");
};

const PostRepository = {
    async findAll() {
        const snapshot = await getCollection().get();
        const posts = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        return posts;
    },

    /** @param {string} id */
    async findByID(id) {
        const docRef = await getCollection().doc(id).get();
        const foundPost = { id: docRef.id, ...docRef.data() };
        return foundPost;
    },

    /** @param {Post} post */
    async save(post) {
        const savedPost = await getCollection().add(post);
        return savedPost;
    },

    /** @param {Post} post */
    async update(post) {
        if (post.id) await getCollection().doc(post.id).set(post);
    },
};

export default PostRepository;