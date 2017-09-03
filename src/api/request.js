/**
 * 
 */
import config from '../config/config.js'
import axios from 'axios'
export default class api {
    /**
     * 获取带书籍数量的父分类
     */
    static categories() {
        return axios.get(config.hostUri + "/categories");
    }
    /**
     * 获取带子分类的分类
     */
    static subCategories() {
        return axios.get(config.hostUri + "/sub-categories");
    }
    /**
     * 获取分类详情
     * @param {string} gender 性别
     * @param {string} type 排序方式
     * @param {string} major 主分类
     * @param {string} minor 子分类
     * @param {string} start 分页查询的起始页索引
     * @param {string} limit 分页标准（每一页的页数）
     */
    static categoryInfo(gender, type, major, minor, start, limit) {
        if (gender === undefined) {
            gender = "male"
        }
        if (type === undefined) {
            type = "hot"
        }
        if (major === undefined) {
            major = "";
        }
        if (minor === undefined) {
            minor = ""
        }
        return axios.get(config.hostUri + "/category-info?gender=" + gender + "&type=" + type +
            "&major=" + major + "&minor=" + minor + "&start=" + start + "&limit=" + limit);
    }
    /**
     * 获取书籍详情
     * @param {string} bookId 
     */
    static bookInfo(bookId) {
        return axios.get(config.hostUri + "/book-info/" + bookId);
    }
    /**
     * 获取书籍相关推荐
     * @param {string} bookId 
     */
    static recommend(bookId) {
        return axios.get(config.hostUri + "/recommend/" + bookId);
    }
    /**
     * 获取作者名下的书籍
     * @param {string} author 
     */
    static authorBooks(author) {
        return axios.get(config.hostUri + "/author-books?author=" + author);
    }
    /**
     * 获取书籍源
     * @param {string} view 
     * @param {string} bookId 
     */
    static bookSources(view, bookId) {
        return axios.get(config.hostUri + "/book-sources?view=" + view + "&book=" + bookId);
    }
    /**
     * 获取书籍章节
     * @param {string} bookId 
     */
    static bookChapters(bookId) {
        return axios.get(config.hostUri + "/book-chapters/" + bookId);
    }
    /**
     * 获取章节详细内容
     * @param {srting} chaptersUri 
     */
    static chapters(chaptersUri) {
        return axios.get(config.hostUri + "/chapters/" + URL.encodeURI(chaptersUri))
    }
    /**
     * 获取搜索结果
     * @param {string} keyword 
     */
    static search(keyword) {
        return axios.get(config.hostUri + "/search?keyword=" + keyword);
    }
    /**
     * 获取排名分类
     */
    static rankCategory() {
        return axios.get(config.hostUri + "/rank-category");
    }
    /**
     * 获取排名详情
     * @param {string} rankId 
     */
    static rank(rankId) {
        return axios.get(config.hostUri + "/rank/" + rankId);
    }
}

