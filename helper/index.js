const slugify = require('slugify')

const toSlug = (name) => {
    return slugify(name, {
        lower: true
    })
}

const createUniqueSlug = (product_name, oldSlug) => {
    let firstSlug = slugify(product_name, { lower: true });
    let slug = firstSlug;
    let count = 2;
    
    while (oldSlug.includes(slug)) {
        slug = `${baseSlug}-${count}`;
        count++;
    }
    
    return slug;
}

module.exports = {
    toSlug, createUniqueSlug
}