/**
 * @class  Post
 */
class Post {
    /**
     * @param {object} param0
     * @param {string} param0.id
     * @param {string} param0.title
     * @param {string} param0.content
     * @param {number} param0.likes
     * @param {number} param0.views
     * @param {string} param0.createdBy
     * @param {string} param0.createdAt
     */
    constructor({ id, title, content, likes, views, createdBy, createdAt }) {
        if (id) this.id = id;
        this.title = title || "Untitled";
        this.content = content || "";
        this.likes = likes || 0;
        this.views = views || 0;
        this.createdBy = createdBy || "Unknown";
        this.createdAt = createdAt || new Date().toISOString();
    }
}

export default Post;