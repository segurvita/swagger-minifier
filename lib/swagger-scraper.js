import yaml from 'js-yaml';

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

//------------------------------------------------------------------
// Public functions
//------------------------------------------------------------------

/**
 * delete target
 * @param {object} inputSwagger input swagger
 * @param {string} scrapTarget target key of scrap
 * @param {string} scrapType type of scrap
 * @param {string} outputFormat format of output
 */
export const scrap = (inputSwagger,
  scrapTarget = 'example',
  scrapType = 'delete',
  outputFormat = 'string') => {
  // validate input
  if (!inputSwagger) {
    throw new Error('inputSwagger is empty.');
  }

  // generate object from input
  const objSwagger = (typeof inputSwagger === 'string')
    ? yaml.safeLoad(inputSwagger)
    : inputSwagger;
  if (!objSwagger) {
    throw new Error('Loading yaml is failed.');
  }

  // scrap target
  switch (scrapType) {
    case 'delete':
      deleteTargetRecursion(objSwagger, scrapTarget);
      break;
    case 'empty':
      emptyTargetRecursion(objSwagger, scrapTarget);
      break;
    default:
  }

  // check output type
  if (outputFormat === 'string') {
    // return string of yaml
    return yaml.safeDump(objSwagger);
  }
  return objSwagger;
};

/**
 *
 * @param {object} inputSwagger  input swagger
 * @param {string} scrapTarget target key of scrap
 * @param {string} outputFormat format of output
 */
export const deleteTarget = (
  inputSwagger, scrapTarget, scrapType, outputFormat,
) => scrap(inputSwagger, scrapTarget, 'delete', outputFormat);

/**
 *
 * @param {object} inputSwagger  input swagger
 * @param {string} scrapTarget target key of scrap
 * @param {string} outputFormat format of output
 */
export const emptyTarget = (
  inputSwagger, scrapTarget, scrapType, outputFormat,
) => scrap(inputSwagger, scrapTarget, 'empty', outputFormat);
