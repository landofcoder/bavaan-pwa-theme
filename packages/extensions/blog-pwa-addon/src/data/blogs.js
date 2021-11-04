export const listBlogs = () => {
    const blogs = {
        items: [],
        total_count: 0
    };
    for (let i = 0; i < 16; i++) {
        const blog = {
            "url_key": "introducing-new-magento-community-initiative-magento-masters",
            "short_content": "<p>In 2015, the Magento community created over 2,500 pull requests and issues for Magento 2.0 on Github, presented over 500 talks on Magento or at Magento-centric events, produced over 100 podcast episodes centered around Magento, organized conferences and meetups in over 24 different countries, wrote three books about Magento, contributed to official product documentation,</p>",
            "page_title": "Introducing a New Magento Community Initiative: Magento Masters",
            "image": "http://magento24.demo4coder.com/media/ves/blog/6127_MagentoMastersBlogHeader_r1v1.png",
            "tags": "eCommerce Forums, Experts",
            "name": "Introducing a New Magento Community Initiative: Magento Masters",
            "creation_time": "2016-02-05 00:00:00",
            "comments": [],
            "author": {
                "email": "admin@gmail.com"
            }
        }
        blogs.items.push(blog)
        blogs.total_count += 1
    }
    return blogs;
}