module.exports = (post) => {
  const blogPost = post
  const regex = /<h4[^>]*>(.*?)<\/h4>/;
  const generateMetaDescription = blogPost.match(regex);
  return generateMetaDescription[1];
}
