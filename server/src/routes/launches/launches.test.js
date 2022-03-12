const request = require('supertest');
const app = require('../../app');
const { 
    mogoConnect,
    mongoDisconnect,
 } = require('../../services/mongo');
 const {
    loadPlanetsData,
  } = require('../../models/planets.model');
  
describe('Launches API', () => {
    beforeAll(async () => {
       await mogoConnect();
       await loadPlanetsData();
    });

    afterAll(async () => {
        await mongoDisconnect();
     });

    describe('Test GET /launches', () => {
        test('It should respnd wiith 200 successs', async () => {
            const response = await request(app)
            .get('/v1/launches')
            .expect("Content-Type", /json/)
            .expect(200);
        });
    });
    
    describe('Test POST /launches', () => {
        const completeLaunchDate = {
                mission : 'USS Enterprise',
                rocket: 'NCC 1701-D',
                target : 'Kepler-62 f',
                launchDate : 'January 4, 2028',
        };
    
        const launchDateWithoutDate = {
                mission : 'USS Enterprise',
                rocket: 'NCC 1701-D',
                target : 'Kepler-62 f',
        }
    
        const launchDateWithoutInvalidDate = {
            mission : 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target : 'Kepler-62 f',
            launchDate : 'zoot',
    }
    
        test('It should respnd wiith 201 created', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchDate)
            .expect("Content-Type", /json/)
            .expect(201);
            
            const requestDate = new Date(completeLaunchDate.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(launchDateWithoutDate);
    
        });
        test('It should catch missing required properties',async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDateWithoutDate)
            .expect("Content-Type", /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            })
        });
        test('It should catch invalid dates', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDateWithoutInvalidDate)
            .expect("Content-Type", /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Invalide launch date'
            })
        });
    });
});