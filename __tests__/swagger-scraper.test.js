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
`;

// sample yaml for test to delete parent of deprecated
const sampleDeleteDeprecatedParent = `swagger: '2.0'
info:
  description: sample
  title: sample
paths:
  '/rooms/{room-id}':
`;

describe('swagger-scraper', () => {
  test('Delete example', () => {
    const result = scraper.deleteTarget(sampleFull, 'example');
    expect(result).toBe(sampleDeleteExample);
  });
  test('Empty description', () => {
    const result = scraper.emptyTarget(sampleFull, 'description');
    expect(result).toBe(sampleEmptyDescription);
  });
  test('Delete parent of deprecated', () => {
    const result = scraper.emptyTarget(sampleFull, 'deprecated');
    expect(result).toBe(sampleDeleteDeprecatedParent);
  });
});
