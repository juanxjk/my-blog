import firebase from "firebase/app";

import User from "../models/User";

const SessionRepository = {
    async loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await firebase.auth().signInWithPopup(provider);

            const googleUser = result.user;
            const user = new User({
                id: googleUser.uid,
                displayName: googleUser.displayName,
                photoURL: googleUser.photoURL,
                email: googleUser.email,
                isEmailVerified: googleUser.emailVerified,
                token: await googleUser.getIdToken(),
            });

            return user;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
        }
    },
    async logoutWithGoogle() {
        await firebase.auth().signOut();
    },
};

export default SessionRepository;