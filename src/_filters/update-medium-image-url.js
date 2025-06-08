export default (post) => {
  const updatedMediumImageURL = post
  .replace(/https:\/\/www\.nikin\.design\/\.11ty\/image\/\?src=https%3A%2F%2Fcdn-images-1\.medium\.com%2Fmax%2F/g,"https://cdn-images-1.medium.com/max/")
  .replace(/%2F/g,"/");
  return updatedMediumImageURL;
};