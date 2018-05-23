/* eslint-disable no-bitwise */

module.exports = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash &= hash;
    hash = Math.abs(hash);
  }

  return hash % max;
};
