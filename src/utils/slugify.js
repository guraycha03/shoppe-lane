export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')      // Replace spaces with dashes
      .replace(/[^\w\-]+/g, '')  // Remove all non-word chars except dash
      .replace(/\-\-+/g, '-');   // Replace multiple dashes with single dash
  }
  