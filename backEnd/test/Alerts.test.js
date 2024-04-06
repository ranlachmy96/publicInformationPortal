const request = require('supertest');
const app = require('../index');
const alertsRepository = require('../repositories/Alerts.repository');
const MongoStorage = require('../data/MongoStorage');
require('dotenv').config();

jest.mock('../repositories/Alerts.repository');

describe('GET /Alerts', () => {
    let mongoStorage;

    beforeAll(async () => {
        // Create an instance of MongoStorage and wait for connection
        mongoStorage = new MongoStorage('Alerts');
        await mongoStorage.connect();
    });

    beforeEach(() => jest.clearAllMocks());

    // Success 200
    it('should return 200', async () => {
        const mockAlerts = [
            {
                _id: 1,
                description: "Alert: Low battery level detected.",
                date: "2024-04-06",
                priority: "Normal"
            },
            {
                _id: 2,
                description: "Urgent Alert: Security breach detected in the system.",
                date: "2024-04-06",
                priority: "High"
            },
            {
                _id: 3,
                description: "water contaminated at narnia river.",
                date: "2024-04-16",
                priority: "High",
            }
        ];

        alertsRepository.find.mockResolvedValue(mockAlerts);
        const res = await request(app).get('/Alerts');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockAlerts);
    });

    // Failure 404
    it('should return 404', async () => {
        const mockAlerts = [];
        alertsRepository.find.mockResolvedValue(mockAlerts);
        const res = await request(app).get('/Alerts');
        expect(res.statusCode).toEqual(404);
    });

    // Failure 500
    it('should return 500', async () => {
        alertsRepository.find.mockRejectedValue(new Error('Test error'));
        const res = await request(app).get('/Alerts');
        expect(res.statusCode).toEqual(500);
    });
});

describe('GET /Alerts/:id', () => {
    beforeEach(() => jest.clearAllMocks())

    // Success 200
    it('should return 200', async () => {
        const mockAlerts = {
            _id: 1,
            description: "Alert: Low battery level detected.",
            date: "2024-04-06",
            priority: "Normal"
        }
        alertsRepository.findById.mockResolvedValue(mockAlerts)
        const res = await request(app).get('/Alerts/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(mockAlerts)
    })
    // Failure 404
    it('should return 404', async () => {
        alertsRepository.findById.mockResolvedValue({})
        const res = await request(app).get('/Alerts/0')
        expect(res.statusCode).toEqual(404)
    })
    // Failure 400
    it('should return 400', async () => {
        const res = await request(app).get('/Alerts/abc')
        expect(res.statusCode).toEqual(400)
    })
    // Failure 500
    it('should return 500', async () => {
        alertsRepository.findById.mockRejectedValue(new Error('Test error'))
        const res = await request(app).get('/Alerts/1')
        expect(res.statusCode).toEqual(500)
    })
})
describe('POST /Alerts/', () => {
    beforeEach(() => jest.clearAllMocks())

    // Success 200
    it('should return 200', async () => {
        const mockAlerts = {
            _id: 1,
            description: "Alert: Low battery level detected.",
            date: "2024-04-06",
            priority: "Normal"
        }
        alertsRepository.create.mockResolvedValue(mockAlerts)
        const res = await request(app).post('/Alerts/').send(mockAlerts)
        expect(res.statusCode).toEqual(200)
    })
    // Failure 400
    it('should return 400 data not provided', async () => {
        const res = await request(app).post('/Alerts/').send({})
        expect(res.statusCode).toEqual(400)
    })
    it('should return 400 Invalid data', async () => {
        const res = await request(app).post('/Alerts/').send(
            {
                _id: 1,
                description: "Alert: Low battery level detected.",
                date: "2024-04-06",
            }
        )
        expect(res.statusCode).toEqual(400)
    })
})
describe('PUT /Alerts/:id', () => {
  beforeEach(() => jest.clearAllMocks())

  // Success 200
  it('should return 200', async () => {
    const mockAlerts = {
        _id: 1,
        description: "Alert: Low battery level detected.",
        date: "2024-04-06",
        priority: "Normal"
    }
    alertsRepository.update.mockResolvedValue(mockAlerts)
    const res = await request(app).put('/Alerts/1').send(mockAlerts)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockAlerts)
  })
  // Failure 400
  it('should return 400', async () => {
    const res = await request(app).put('/Alerts/abc').send({})
    expect(res.statusCode).toEqual(400)
  })
  // Failure 404
  it('should return 404', async () => {
    alertsRepository.update.mockResolvedValue(null)
    const res = await request(app).put('/Alerts/1').send({})
    expect(res.statusCode).toEqual(404)
  })
})
describe('DELETE /Alerts/:id', () => {
  beforeEach(() => jest.clearAllMocks())

  // Success 200
  it('should return 200', async () => {
    const mockAlerts = {
        _id: 1,
        description: "Alert: Low battery level detected.",
        date: "2024-04-06",
        priority: "Normal"
    }
      alertsRepository.deleteById.mockResolvedValue(mockAlerts)
    const res = await request(app).delete('/Alerts/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockAlerts)
  })
  // Failure 400
  it('should return 400', async () => {
    const res = await request(app).delete('/Alerts/abc')
    expect(res.statusCode).toEqual(400)
  })
  // Failure 404
  it('should return 404', async () => {
      alertsRepository.deleteById.mockResolvedValue(null)
    const res = await request(app).delete('/Alerts/1')
    expect(res.statusCode).toEqual(404)
  })
  // Failure 500
  it('should return 500', async () => {
      alertsRepository.deleteById.mockRejectedValue(new Error('Test error'))
    const res = await request(app).delete('/Alerts/1')
    expect(res.statusCode).toEqual(500)
  })
})
