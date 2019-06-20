import scraper from '../lib/swagger-scraper';

// sample yaml with example for test
const sampleWithExample = `swagger: '2.0'
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
const sampleWithoutExample = `swagger: '2.0'
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

describe('swagger-scraper', () => {
  test('Remove example', () => {
    const resultRmExample = scraper(sampleWithExample);
    expect(resultRmExample).toBe(sampleWithoutExample);
  });
});
