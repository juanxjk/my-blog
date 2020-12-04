class User {
    /**
     *
     * @param {object} param0
     * @param {string} param0.id
     * @param {string} param0.displayName
     * @param {string} param0.photoURL
     * @param {string} param0.email
     * @param {boolean} param0.isEmailVerified
     * @param {string} param0.token
     */
    constructor({ id, displayName, photoURL, email, isEmailVerified, token }) {
        this.id = id;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.email = email;
        this.isEmailVerified = isEmailVerified;
        this.token = token;
    }
}

export default User;