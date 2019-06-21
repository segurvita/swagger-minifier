import yaml from 'js-yaml';
import * as scraper from '../lib/swagger-scraper';

// sample yaml
const sampleFull = `swagger: '2.0'
info:
  description: sample
  title: sample
paths:
  '/rooms/{room-id}':
    get:
      deprecated: true
      description: room
      parameters:
        - name: room-id
          in: path
          type: integer
      responses:
        '200':
          description: OK
          schema:
            type: object
            properties:
              id:
                type: integer
                example: 404
              comment:
                type: string
                example: 404
  '/rooms/{room-id}/doors':
    get:
      deprecated: true
      responses:
        '200':
          schema:
            type: array
    post:
      responses:
        '200':
          schema:
            type: object
`;

// sample yaml for test to delete example
const sampleDeleteExample = `swagger: '2.0'
info:
  description: sample
  title: sample
paths:
  '/rooms/{room-id}':
    get:
      deprecated: true
      description: room
      parameters:
        - name: room-id
          in: path
          type: integer
      responses:
        '200':
          description: OK
          schema:
            type: object
            properties:
              id:
                type: integer
              comment:
                type: string
  '/rooms/{room-id}/doors':
    get:
      deprecated: true
      responses:
        '200':
          schema:
            type: array
    post:
      responses:
        '200':
          schema:
            type: object
`;

// sample yaml for test to empty description
const sampleEmptyDescription = `swagger: '2.0'
info:
  description: ''
  title: sample
paths:
  '/rooms/{room-id}':
    get:
      deprecated: true
      description: ''
      parameters:
        - name: room-id
          in: path
          type: integer
      responses:
        '200':
          description: ''
          schema:
            type: object
            properties:
              id:
                type: integer
                example: 404
              comment:
                type: string
                example: 404
  '/rooms/{room-id}/doors':
    get:
      deprecated: true
      responses:
        '200':
          schema:
            type: array
    post:
      responses:
        '200':
          schema:
            type: object
`;

// sample yaml for test to delete parent of deprecated
const sampleDeleteDeprecatedParent = `swagger: '2.0'
info:
  description: sample
  title: sample
paths:
  '/rooms/{room-id}/doors':
    post:
      responses:
        '200':
          schema:
            type: object
`;

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
});
