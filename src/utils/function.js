/* eslint-disable prefer-const */
export const formatNumberWithComma = (x) => {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const copyToClipboard = value => {
  const $textarea = document.createElement('textarea');
  $textarea.value = value;
  document.body.appendChild($textarea);
  $textarea.select();
  document.execCommand('copy');
  document.body.removeChild($textarea);
};
