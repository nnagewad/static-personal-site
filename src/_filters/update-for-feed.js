module.exports = (post) => {
  const updatedCopy = post
    .replace(/(&lt;)+?/, "&amp;lt;")
    .replace(/(&gt;)+?/, "&amp;gt;")
  return updatedCopy;
}
