export default (post) => {
  const updatedCopy = post
    .replace(/(<h4>)+?/, "<p class='lead-paragraph'>")
    .replace(/(<\/h4>)+?/, "</p>")
    .replace(/(<h3>)/g, "<h2 class='font-size-2'>")
    .replace(/(<\/h3>)/g, "</h2>")
    .replace(/(<h4>)/g, "<h3 class='font-size-1'>")
    .replace(/(<\/h4>)/g, "</h3>")
    .replace(/(<figcaption>)/g, "<figcaption class='font-size--1'>")
    .replace(/(<blockquote>)/g, "<blockquote class='font-size-1'>")
    // Remove Medium tracking pixels
    .replace(/<img[^>]*src="https:\/\/medium\.com\/_\/stat[^"]*"[^>]*>/g, "")
    // Add lazy loading and async decoding to all external images (Medium, etc.)
    .replace(/(<img\s+)([^>]*src=["']https?:\/\/[^"']*["'])([^>]*)>/g, (match, openTag, srcAttr, restAttrs) => {
      // Check if loading or decoding attributes already exist with flexible patterns
      // Handles variations like: loading="lazy", loading='lazy', loading = "lazy", etc.
      const hasLoading = /loading\s*=\s*["'][^"']*["']/i.test(restAttrs) || /loading\s*=\s*["'][^"']*["']/i.test(srcAttr);
      const hasDecoding = /decoding\s*=\s*["'][^"']*["']/i.test(restAttrs) || /decoding\s*=\s*["'][^"']*["']/i.test(srcAttr);
      
      let result = openTag + srcAttr + restAttrs;
      
      // Add loading="lazy" if not present
      if (!hasLoading) {
        result += ' loading="lazy"';
      }
      
      // Add decoding="async" if not present
      if (!hasDecoding) {
        result += ' decoding="async"';
      }
      
      return result + '>';
    });
  return updatedCopy;
}
