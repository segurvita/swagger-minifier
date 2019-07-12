const yaml = require('js-yaml');
const scraper = require('yaml-scraper');

//------------------------------------------------------------------
// Private functions
//------------------------------------------------------------------

//------------------------------------------------------------------
// Private class
//------------------------------------------------------------------

/**
 * class of swagger-scraper
 */
class Scraper {
  /**
   * constructor of class
   * @param {string} inputSwagger
   */
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
    scraper(this.value).delete(scrapTarget);
    return this;
  }

  /**
   * Empty target
   * @param {string} scrapTarget target key of scrap
   */
  emptyTarget(scrapTarget) {
    scraper(this.value).empty(scrapTarget);
    return this;
  }

  /**
   * Delete parent of target
   * @param {string} scrapTarget target key of scrap
   */
  deleteParent(scrapTarget) {
    scraper(this.value).deleteParent(scrapTarget);
    return this;
  }

  /**
   * Delete deprecated method
   */
  deleteDeprecatedMethod() {
    Object.keys(this.value.paths)
      .forEach((keyPath) => {
        // Delete deprecated method
        Object.keys(this.value.paths[keyPath])
          .forEach((keyMethod) => {
            if (this.value.paths[keyPath][keyMethod].deprecated) {
              // eslint-disable-next-line no-param-reassign
              delete this.value.paths[keyPath][keyMethod];
            }
          });

        // Delete empty path
        if (Object.keys(this.value.paths[keyPath]).length === 0) {
          // eslint-disable-next-line no-param-reassign
          delete this.value.paths[keyPath];
        }
      });
    return this;
  }

  /**
   * Generate yaml string
   */
  toString() {
    return yaml.safeDump(this.value);
  }

  /**
   * Generate JavaScript object
   */
  toObject() {
    return this.value;
  }
}

//------------------------------------------------------------------
// Public function
//------------------------------------------------------------------

/**
 * return instance of class Scraper
 */
module.exports = inputSwagger => new Scraper(inputSwagger);
