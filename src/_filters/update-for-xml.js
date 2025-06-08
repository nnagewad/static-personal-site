export default (post) => {
  const updatedForXML = post
    .replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, "&amp;")
    // Ensure self-closing tags
    .replace(/<img([^>]*?)(?<!\/)>/g, "<img$1 />")
    .replace(/<source([^>]*?)(?<!\/)>/g, "<source$1 />")
    .replace(/<br([^>]*?)(?<!\/)>/g, "<br$1 />");
  return updatedForXML;
};