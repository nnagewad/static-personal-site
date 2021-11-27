module.exports = (post) => {
  const updatedCopy = post
    .replace(/(<h4>)+?/, "<p class='lead-paragraph'>")
    .replace(/(<\/h4>)+?/, "</p>")
    .replace(/(<h3>)/g, "<h2 class='font-size-2'>")
    .replace(/(<\/h3>)/g, "</h2>")
    .replace(/(<h4>)/g, "<h3 class='font-size-1'>")
    .replace(/(<\/h4>)/g, "</h3>")
    .replace(/(<img src=.https:\/\/medium.*>)/g, "");
  return updatedCopy;
}
