import * as scraper from '../lib/swagger-scraper';

// sample yaml
const sampleFull = `swagger: '2.0'
info:
  description: sample
  title: sample
paths:
  '/rooms/{room-id}':
    get:
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

// sample yaml without exammple for test
const sampleDeleteExample = `swagger: '2.0'
info:
  description: sample
  title: sample
paths:
  '/rooms/{room-id}':
    get:
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

// sample yaml without exammple for test
const sampleEmptyDescription = `swagger: '2.0'
info:
  description: ''
  title: sample
paths:
  '/rooms/{room-id}':
    get:
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

describe('swagger-scraper', () => {
  test('Delete example', () => {
    const result = scraper.deleteTarget(sampleFull, 'example');
    expect(result).toBe(sampleDeleteExample);
  });
  test('Empty description', () => {
    const result = scraper.emptyTarget(sampleFull, 'description');
    expect(result).toBe(sampleEmptyDescription);
  });
});
