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
// Public class
//------------------------------------------------------------------

module.exports = class Scraper {
  constructor(inputSwagger) {
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

    // input
    this.value = objSwagger;
  }

  /**
   * Delete target
   * @param {string} scrapTarget target key of scrap
   */
  deleteTarget(scrapTarget) {
    deleteTargetRecursion(this.value, scrapTarget);
    return this;
  }

  /**
   * Empty target
   * @param {string} scrapTarget target key of scrap
   */
  emptyTarget(scrapTarget) {
    emptyTargetRecursion(this.value, scrapTarget);
    return this;
  }

  /**
   * Delete parent of target
   * @param {string} scrapTarget target key of scrap
   */
  deleteParent(scrapTarget) {
    deleteParentRecursion(this.value, scrapTarget);
    return this;
  }

  toString() {
    return yaml.safeDump(this.value);
  }

  toObject() {
    return this.value;
  }
};
