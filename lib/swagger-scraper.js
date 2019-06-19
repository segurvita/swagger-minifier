import yaml from 'js-yaml';

//------------------------------------------------------------------
// Private functions
//------------------------------------------------------------------

/**
 * Recursion function to remove example
 * @param {object} obj
 */
const removeExampleRecursion = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      if (key === 'example') {
        // eslint-disable-next-line no-param-reassign
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        removeExampleRecursion(obj[key]);
      }
    }
  });
};

//------------------------------------------------------------------
// Public functions
//------------------------------------------------------------------

/**
 * Scrap swagger
 * @param {string} input
 */
const scraper = (input) => {
  // validate input
  if (!input) {
    console.error('Error: input is empty.');
    return false;
  }

  // load yaml
  const doc = yaml.safeLoad(input);
  if (!doc) {
    console.error('Error: loading yaml is failed.');
    return false;
  }

  // remove example
  if (doc.definitions) {
    removeExampleRecursion(doc.definitions);
  }

  if (doc.parameters) {
    removeExampleRecursion(doc.parameters);
  }

  if (doc.responses) {
    removeExampleRecursion(doc.responses);
  }

  if (doc.paths) {
    removeExampleRecursion(doc.paths);
  }

  if (doc.components) {
    removeExampleRecursion(doc.components);
  }

  // return yaml
  return yaml.safeDump(doc);
};

export default scraper;
