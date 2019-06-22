const fs = require('fs');
const yaml = require('js-yaml');
const scraper = require('../lib/swagger-scraper');

// sample yaml
const sampleFull = fs.readFileSync('./sample/sample-full.yaml', 'utf8');

// sample yaml for test to delete example
const sampleDeleteExample = fs.readFileSync('./sample/sample-delete-example.yaml', 'utf8');

// sample yaml for test to empty description
const sampleEmptyDescription = fs.readFileSync('./sample/sample-empty-description.yaml', 'utf8');

// sample yaml for test to delete parent of deprecated
const sampleDeleteDeprecatedParent = fs.readFileSync('./sample/sample-delete-deprecated-parent.yaml', 'utf8');

// unit test
describe('swagger-scraper', () => {
  describe('Format is string', () => {
    test('Delete example', () => {
      const strOutput = scraper.deleteTarget(sampleFull, 'example', 'string');
      expect(strOutput).toBe(sampleDeleteExample);
    });
    test('Empty description', () => {
      const strOutput = scraper.emptyTarget(sampleFull, 'description', 'string');
      expect(strOutput).toBe(sampleEmptyDescription);
    });
    test('Delete parent of deprecated', () => {
      const strOutput = scraper.deleteParent(sampleFull, 'deprecated', 'string');
      expect(strOutput).toBe(sampleDeleteDeprecatedParent);
    });
  });
  describe('Format is object', () => {
    test('Delete example', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = scraper.deleteTarget(objInput, 'example', 'object');
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleDeleteExample);
    });
    test('Empty description', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = scraper.emptyTarget(objInput, 'description', 'object');
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleEmptyDescription);
    });
    test('Delete parent of deprecated', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = scraper.deleteParent(objInput, 'deprecated', 'object');
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleDeleteDeprecatedParent);
    });
  });
  describe('Exception test', () => {
    test('Falsy', () => {
      try {
        scraper.deleteTarget('', 'example', 'string');
      } catch (error) {
        expect(error.message).toBe('inputSwagger is falsy.');
      }
    });
    test('Falsy', () => {
      try {
        scraper.deleteTarget('hoge', 'example', 'string');
      } catch (error) {
        expect(error.message).toBe('Loading yaml is failed.');
      }
    });
  });
});
