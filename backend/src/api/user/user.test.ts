import request from 'supertest';

import app from '../../app';
import { prismaMock as db } from '../../utils/testSingleton';

beforeAll(async () => {
	try {
	    //await db.user.drop;
  	} catch (error) {}
});

// connect as admin and save token

describe('POST /api/v1/user/register', () => {
  	it('creates an user in db', (done) => {
		const payload = {
			username: "Bunnybunbun",
			password: "root",
			token: ""
		}
		request(app)
			.post('/api/v1/user/register')
			.send(payload)
			.set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
			.expect(201, { message: 'User Bunnybunbun has been created.' }, done);
  	});
});
