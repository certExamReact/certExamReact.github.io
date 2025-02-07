export const sanitizeEntityHtml = (text) => {
  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.documentElement.textContent;
};
