import React, { useEffect } from 'react';

function Blog() {
  const Blog = () => {
    const [blogposts, setBlogposts] = useState([]);

    useEffect(() => {
      const fetchBlogPosts = async () => {
        try {
          const response = await fetch(
            'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@username'
          );
          const data = await response.json();
          const items = data.items || [];
          console.log(items);
          
          setBlogposts(items);
        } catch (error) {
          console.error('Error fetching blog posts:', error);
        }
      };
      fetchBlogPosts();
    }, []);
    return <div></div>;
  };

  return <div>Blog</div>;
}

export default Blog;
