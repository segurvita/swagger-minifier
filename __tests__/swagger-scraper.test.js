const fs = require('fs');
const yaml = require('js-yaml');
const Scraper = require('../lib/swagger-scraper');

// sample yaml
const sampleFull = fs.readFileSync('./sample/sample-full.yaml', 'utf8');

// sample yaml for test to delete example
const sampleDeleteExample = fs.readFileSync('./sample/sample-delete-example.yaml', 'utf8');

// sample yaml for test to empty description
const sampleEmptyDescription = fs.readFileSync('./sample/sample-empty-description.yaml', 'utf8');

// sample yaml for test to delete parent of deprecated
const sampleDeleteDeprecatedParent = fs.readFileSync('./sample/sample-delete-deprecated-parent.yaml', 'utf8');

// sample yaml for test to delete deprecated method
const sampleDeleteDeprecatedMethod = fs.readFileSync('./sample/sample-delete-deprecated-method.yaml', 'utf8');

// unit test
describe('swagger-scraper', () => {
  describe('Format is string', () => {
    test('Delete example', () => {
      const strOutput = Scraper(sampleFull).deleteTarget('example').toString();
      expect(strOutput).toBe(sampleDeleteExample);
    });
    test('Empty description', () => {
      const strOutput = Scraper(sampleFull).emptyTarget('description').toString();
      expect(strOutput).toBe(sampleEmptyDescription);
    });
    test('Delete parent of deprecated', () => {
      const strOutput = Scraper(sampleFull).deleteParent('deprecated').toString();
      expect(strOutput).toBe(sampleDeleteDeprecatedParent);
    });
  });
  describe('Format is object', () => {
    test('Delete example', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = Scraper(objInput).deleteTarget('example').toObject();
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleDeleteExample);
    });
    test('Empty description', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = Scraper(objInput).emptyTarget('description').toObject();
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleEmptyDescription);
    });
    test('Delete parent of deprecated', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = Scraper(objInput).deleteParent('deprecated').toObject();
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleDeleteDeprecatedParent);
    });
    test('Delete deprecated method', () => {
      const objInput = yaml.safeLoad(sampleFull);
      const objOutput = Scraper(objInput).deleteDeprecatedMethod().toObject();
      const strOutput = yaml.safeDump(objOutput);
      expect(strOutput).toBe(sampleDeleteDeprecatedMethod);
    });
  });
  describe('Exception test', () => {
    test('Falsy', () => {
      try {
        Scraper('').deleteTarget('example').toString();
      } catch (error) {
        expect(error.message).toBe('inputSwagger is falsy.');
      }
    });
    test('Falsy', () => {
      try {
        Scraper('hoge').deleteTarget('example').toString();
      } catch (error) {
        expect(error.message).toBe('Loading yaml is failed.');
      }
    });
  });
});
