import { createGameLobbyServer } from './gameLobbyServer';
import request, { SuperTest, Test } from 'supertest';

describe('gameLobbyServer', () => {
  let tester: SuperTest<Test>;
  let test: Test;

  beforeAll(() => {
    const { express } = createGameLobbyServer({ port: 3001 })
    tester = request(express);
  });

  afterAll(() => {
    test.end(err => {
      if (err) throw err;
    });
  })

  it('pings alright', () => {
    // act
    test = tester.get('/ping');

    // assert
    test.expect(200);
  })
});