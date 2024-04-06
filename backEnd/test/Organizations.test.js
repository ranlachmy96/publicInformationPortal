const request = require('supertest');
const app = require('../index');
const organizationsRepository = require('../repositories/Organizations.repository');
const MongoStorage = require('../data/MongoStorage');
require('dotenv').config();

jest.mock('../repositories/Organizations.repository');

describe('GET /Organizations', () => {
    let mongoStorage;

    beforeAll(async () => {
        // Create an instance of MongoStorage and wait for connection
        mongoStorage = new MongoStorage('Organizations');
        await mongoStorage.connect();
    });

    beforeEach(() => jest.clearAllMocks());

    // Success 200
    it('should return 200', async () => {
        const mockOrganizations = [
            {
                _id: 1,
                org_id: 1,
                title: "Police",
                description: "The police are a constituted body of persons empowered by a state, with the aim to enforce the law, protect public order, and the public itself.",
                url: "https://www.gov.il/he/departments/israel_police/govil-landing-page",
                phone: 100
            },
            {
                _id: 2,
                org_id: 2,
                title: "Magen David Adom",
                description: "Magen David Adom, Israel's National Emergency Pre-Hospital Medical and Blood Services Organization.",
                url: "https://www.gov.il/he/departments/israel_police/govil-landing-page",
                phone: 101
            },
            {
                _id: 3,
                org_id: 3,
                title: "Fire Department",
                description: "The National Fire & Rescue Authority in Israel is responsible for firefighting, rescue operations, and handling hazardous material emergencies.",
                url: "https://www.gov.il/he/departments/firefighting_and_rescue_israel/govil-landing-page",
                phone: 102
            }
        ];

        organizationsRepository.find.mockResolvedValue(mockOrganizations);
        const res = await request(app).get('/Organizations');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockOrganizations);
    });

    // Failure 404
    it('should return 404', async () => {
        const mockOrganizations = [];
        organizationsRepository.find.mockResolvedValue(mockOrganizations);
        const res = await request(app).get('/Organizations');
        expect(res.statusCode).toEqual(404);
    });

    // Failure 500
    it('should return 500', async () => {
        organizationsRepository.find.mockRejectedValue(new Error('Test error'));
        const res = await request(app).get('/Organizations');
        expect(res.statusCode).toEqual(500);
    });
});

describe('GET /Organizations/:id', () => {
    beforeEach(() => jest.clearAllMocks())

    // Success 200
    it('should return 200', async () => {
        const mockOrganizations = {
            _id: 1,
            org_id: 1,
            title: "Police",
            description: "The police are a constituted body of persons empowered by a state, with the aim to enforce the law, protect public order, and the public itself.",
            url: "https://www.gov.il/he/departments/israel_police/govil-landing-page",
            phone: 100
        }
        organizationsRepository.findById.mockResolvedValue(mockOrganizations)
        const res = await request(app).get('/Organizations/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(mockOrganizations)
    })
    // Failure 404
    it('should return 404', async () => {
        organizationsRepository.findById.mockResolvedValue({})
        const res = await request(app).get('/Organizations/0')
        expect(res.statusCode).toEqual(404)
    })
    // Failure 400
    it('should return 400', async () => {
        const res = await request(app).get('/Organizations/abc')
        expect(res.statusCode).toEqual(400)
    })
    // Failure 500
    it('should return 500', async () => {
        organizationsRepository.findById.mockRejectedValue(new Error('Test error'))
        const res = await request(app).get('/Organizations/1')
        expect(res.statusCode).toEqual(500)
    })
})
describe('POST /Organizations/', () => {
    beforeEach(() => jest.clearAllMocks())

    // Success 200
    it('should return 200', async () => {
        const mockOrganizations = {
            _id: 4,
            org_id: 4,
            title: "Test Department",
            description: "Lorem Ipsum",
            url: "https://hackertyper.com/",
            phone: 666,
        }
        organizationsRepository.create.mockResolvedValue(mockOrganizations)
        const res = await request(app).post('/Organizations/').send(mockOrganizations)
        expect(res.statusCode).toEqual(200)
    })
    // Failure 400
    it('should return 400 data not provided', async () => {
        const res = await request(app).post('/Organizations/').send({})
        expect(res.statusCode).toEqual(400)
    })
    it('should return 400 Invalid data', async () => {
        const res = await request(app).post('/Organizations/').send(
            {
                _id: 4,
                org_id: 4,
                title: "Test Department",
                description: "Lorem Ipsum",
                phone: 666,
            }
        )
        expect(res.statusCode).toEqual(400)
    })
})
describe('PUT /Organizations/:id', () => {
  beforeEach(() => jest.clearAllMocks())

  // Success 200
  it('should return 200', async () => {
    const mockOrganizations = {
        _id: 4,
        org_id: 4,
        title: "Test Department",
        description: "Lorem Ipsum",
        url: "https://hackertyper.com/",
        phone: 666,
    }
    organizationsRepository.update.mockResolvedValue(mockOrganizations)
    const res = await request(app).put('/Organizations/1').send(mockOrganizations)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockOrganizations)
  })
  // Failure 400
  it('should return 400', async () => {
    const res = await request(app).put('/Organizations/abc').send({})
    expect(res.statusCode).toEqual(400)
  })
  // Failure 404
  it('should return 404', async () => {
    organizationsRepository.update.mockResolvedValue(null)
    const res = await request(app).put('/Organizations/1').send({})
    expect(res.statusCode).toEqual(404)
  })
})
describe('DELETE /Organizations/:id', () => {
  beforeEach(() => jest.clearAllMocks())

  // Success 200
  it('should return 200', async () => {
    const mockOrganizations = {
        _id: 4,
        org_id: 4,
        title: "Test Department",
        description: "Lorem Ipsum",
        url: "https://hackertyper.com/",
        phone: 666,
    }
      organizationsRepository.deleteById.mockResolvedValue(mockOrganizations)
    const res = await request(app).delete('/Organizations/4')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockOrganizations)
  })
  // Failure 400
  it('should return 400', async () => {
    const res = await request(app).delete('/Organizations/abc')
    expect(res.statusCode).toEqual(400)
  })
  // Failure 404
  it('should return 404', async () => {
      organizationsRepository.deleteById.mockResolvedValue(null)
    const res = await request(app).delete('/Organizations/1')
    expect(res.statusCode).toEqual(404)
  })
  // Failure 500
  it('should return 500', async () => {
      organizationsRepository.deleteById.mockRejectedValue(new Error('Test error'))
    const res = await request(app).delete('/Organizations/1')
    expect(res.statusCode).toEqual(500)
  })
})
