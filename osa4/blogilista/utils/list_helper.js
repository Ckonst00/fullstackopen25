const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    
    else if (blogs.length === 1) {
        return blogs[0].likes
    }

    else {
    const initialValue = 0;
    const likes = blogs.map(blog => blog.likes)
    const total = likes.reduce((num, nextNum) => num + nextNum, initialValue);
    return total

    }
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, current) => current.likes > max.likes ? current : max);
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}