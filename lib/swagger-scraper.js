const yaml = require('js-yaml');

//------------------------------------------------------------------
// Private functions
//------------------------------------------------------------------

/**
 * Recursion function to delete target
 * @param {object} objSwagger object of swagger
 * @param {string} scrapTarget target of swagger key
 */
const deleteTargetRecursion = (objSwagger, scrapTarget) => {
  Object.keys(objSwagger)
    .filter(keySwagger => objSwagger[keySwagger])
    .forEach((keySwagger) => {
      if (keySwagger === scrapTarget) {
        // eslint-disable-next-line no-param-reassign
        delete objSwagger[keySwagger];
      } else if (typeof objSwagger[keySwagger] === 'object') {
        deleteTargetRecursion(objSwagger[keySwagger], scrapTarget);
      }
    });
};

/**
 * Recursion function to empty target
 * @param {object} objSwagger object of swagger
 * @param {string} scrapTarget target of swagger key
 */
const emptyTargetRecursion = (objSwagger, scrapTarget) => {
  Object.keys(objSwagger)
    .filter(keySwagger => objSwagger[keySwagger])
    .forEach((keySwagger) => {
      if (keySwagger === scrapTarget) {
        // eslint-disable-next-line no-param-reassign
        objSwagger[keySwagger] = '';
      } else if (typeof objSwagger[keySwagger] === 'object') {
        emptyTargetRecursion(objSwagger[keySwagger], scrapTarget);
      }
    });
};

/**
 * Recursion function to delete parent of target
 * @param {object} objSwagger object of swagger
 * @param {string} scrapTarget target of swagger key
 */
const deleteParentRecursion = (objSwagger, scrapTarget) => {
  Object.keys(objSwagger)
    .forEach((keySwagger) => {
      if (objSwagger[keySwagger][scrapTarget]) {
        // eslint-disable-next-line no-param-reassign
        delete objSwagger[keySwagger];
      } else if (typeof objSwagger[keySwagger] === 'object') {
        deleteParentRecursion(objSwagger[keySwagger], scrapTarget);
        if (Object.keys(objSwagger[keySwagger]).length === 0) {
          // eslint-disable-next-line no-param-reassign
          delete objSwagger[keySwagger];
        }
      }
    });
};

//------------------------------------------------------------------
// Public functions
//------------------------------------------------------------------

/**
 * Scrap target
 * @param {object} inputSwagger input swagger
 * @param {string} outputFormat format of output. [string, object]
 */
const scrap = (
  inputSwagger,
  outputFormat = 'string',
  recursion,
) => {
  // validate input
  if (!inputSwagger) {
    throw new Error('inputSwagger is falsy.');
  }

  // generate object from input
  const objSwagger = (typeof inputSwagger === 'string')
    ? yaml.safeLoad(inputSwagger)
    : inputSwagger;
  if (!objSwagger) {
    throw new Error('Loading yaml is failed.');
  }

  // scrap target
  if (typeof recursion === 'function') {
    recursion(objSwagger);
  } else {
    throw new Error('recursion is not function.');
  }

  // check output type
  if (outputFormat === 'string') {
    // return string of yaml
    return yaml.safeDump(objSwagger);
  }
  return objSwagger;
};

/**
 * Delete target
 * @param {object} inputSwagger  input swagger
 * @param {string} scrapTarget target key of scrap
 * @param {string} outputFormat format of output. [string, object]
 */
exports.deleteTarget = (inputSwagger, scrapTarget, outputFormat) => scrap(
  inputSwagger, outputFormat,
  objSwagger => deleteTargetRecursion(objSwagger, scrapTarget),
);

/**
 * Empty target
 * @param {object} inputSwagger  input swagger
 * @param {string} scrapTarget target key of scrap
 * @param {string} outputFormat format of output. [string, object]
 */
exports.emptyTarget = (inputSwagger, scrapTarget, outputFormat) => scrap(
  inputSwagger, outputFormat,
  objSwagger => emptyTargetRecursion(objSwagger, scrapTarget),
);

/**
 * Delete parent of target
 * @param {object} inputSwagger  input swagger
 * @param {string} scrapTarget target key of scrap
 * @param {string} outputFormat format of output. [string, object]
 */
exports.deleteParent = (inputSwagger, scrapTarget, outputFormat) => scrap(
  inputSwagger, outputFormat,
  objSwagger => deleteParentRecursion(objSwagger, scrapTarget),
);
