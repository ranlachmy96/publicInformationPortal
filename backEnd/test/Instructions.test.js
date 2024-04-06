const request = require('supertest');
const app = require('../index');
const instructionsRepository = require('../repositories/Instructions.repository');
const MongoStorage = require('../data/MongoStorage');
require('dotenv').config();

jest.mock('../repositories/Instructions.repository');

describe('GET /Instructions', () => {
    let mongoStorage;

    beforeAll(async () => {
        // Create an instance of MongoStorage and wait for connection
        mongoStorage = new MongoStorage('Instructions');
        await mongoStorage.connect();
    });

    beforeEach(() => jest.clearAllMocks());

    // Success 200
    it('should return 200', async () => {
        const mockInstructions = [
            {
                _id: 1,
                category: "Donations",
                title: "Supporting Relief Efforts Through Donations",
                description: "Your generous donations are essential in supporting relief efforts during crises such as natural disasters, pandemics, or humanitarian emergencies. By contributing, you help provide immediate assistance, essential supplies, shelter, medical aid, and other forms of support to affected individuals and communities, making a significant difference in rebuilding lives and restoring hope.",
                date: "14/03/2024"
            },
            {
                _id: 2,
                category: "Security Threats",
                title: "Enhancing Security Measures Against Threats",
                description: "Amid security threats, including cyberattacks, terrorism, and geopolitical challenges, your contributions play a vital role in enhancing security measures. Your support enables us to invest in advanced technologies, training programs, and resources necessary to safeguard individuals and communities, ensuring a safer environment for everyone.",
                date: "14/03/2024"
            },
            {
                _id: 3,
                category: "Rockets and Missiles",
                title: "Mitigating Risks from Rockets and Missiles",
                description: "In areas prone to rocket attacks or missile threats, your donations are crucial in mitigating risks and protecting vulnerable populations. Your support enables us to implement proactive measures, such as early warning systems, shelters, and emergency response plans, to minimize harm and ensure the safety of affected communities.",
                date: "14/03/2024"
            }
        ];

        instructionsRepository.find.mockResolvedValue(mockInstructions);
        const res = await request(app).get('/Instructions');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockInstructions);
    });

    // Failure 404
    it('should return 404', async () => {
        const mockInstructions = [];
        instructionsRepository.find.mockResolvedValue(mockInstructions);
        const res = await request(app).get('/Instructions');
        expect(res.statusCode).toEqual(404);
    });

    // Failure 500
    it('should return 500', async () => {
        instructionsRepository.find.mockRejectedValue(new Error('Test error'));
        const res = await request(app).get('/Instructions');
        expect(res.statusCode).toEqual(500);
    });
});

describe('GET /Instructions/:id', () => {
    beforeEach(() => jest.clearAllMocks())

    // Success 200
    it('should return 200', async () => {
        const mockInstructions = {
            _id: 1,
            category: "Donations",
            title: "Supporting Relief Efforts Through Donations",
            description: "Your generous donations are essential in supporting relief efforts during crises such as natural disasters, pandemics, or humanitarian emergencies. By contributing, you help provide immediate assistance, essential supplies, shelter, medical aid, and other forms of support to affected individuals and communities, making a significant difference in rebuilding lives and restoring hope.",
            date: "14/03/2024"
        }
        instructionsRepository.findById.mockResolvedValue(mockInstructions)
        const res = await request(app).get('/Instructions/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(mockInstructions)
    })
    // Failure 404
    it('should return 404', async () => {
        instructionsRepository.findById.mockResolvedValue({})
        const res = await request(app).get('/Instructions/0')
        expect(res.statusCode).toEqual(404)
    })
    // Failure 400
    it('should return 400', async () => {
        const res = await request(app).get('/Instructions/abc')
        expect(res.statusCode).toEqual(400)
    })
    // Failure 500
    it('should return 500', async () => {
        instructionsRepository.findById.mockRejectedValue(new Error('Test error'))
        const res = await request(app).get('/Instructions/1')
        expect(res.statusCode).toEqual(500)
    })
})
describe('POST /Instructions/', () => {
    beforeEach(() => jest.clearAllMocks())

    // Success 200
    it('should return 200', async () => {
        const mockInstructions = {
            _id: 9,
            title: "Test Title",
            description: "Lorem Ipsum",
            date: "1/1/2024",
            category: "Test",
        }
        instructionsRepository.create.mockResolvedValue(mockInstructions)
        const res = await request(app).post('/Instructions/').send(mockInstructions)
        expect(res.statusCode).toEqual(200)
    })
    // Failure 400
    it('should return 400 data not provided', async () => {
        const res = await request(app).post('/Instructions/').send({})
        expect(res.statusCode).toEqual(400)
    })
    it('should return 400 Invalid data', async () => {
        const res = await request(app).post('/Instructions/').send(
            {
                title: "Test Title",
                description: "Lorem Ipsum",
                date: "1/1/2024"
            }
        )
        expect(res.statusCode).toEqual(400)
    })
})
describe('PUT /Instructions/:id', () => {
  beforeEach(() => jest.clearAllMocks())

  // Success 200
  it('should return 200', async () => {
    const mockInstructions = {
        _id: 1,
        title: "Test Title",
        description: "Lorem Ipsum",
        date: "1/1/2024",
        category: "Test",
    }
    instructionsRepository.update.mockResolvedValue(mockInstructions)
    const res = await request(app).put('/Instructions/1').send(mockInstructions)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockInstructions)
  })
  // Failure 400
  it('should return 400', async () => {
    const res = await request(app).put('/Instructions/abc').send({})
    expect(res.statusCode).toEqual(400)
  })
  // Failure 404
  it('should return 404', async () => {
    instructionsRepository.update.mockResolvedValue(null)
    const res = await request(app).put('/Instructions/1').send({})
    expect(res.statusCode).toEqual(404)
  })
})
describe('DELETE /Instructions/:id', () => {
  beforeEach(() => jest.clearAllMocks())

  // Success 200
  it('should return 200', async () => {
    const mockInstructions = {
        _id: 9,
        title: "Test Title",
        description: "Lorem Ipsum",
        date: "1/1/2024",
        category: "Test",
    }
      instructionsRepository.deleteById.mockResolvedValue(mockInstructions)
    const res = await request(app).delete('/Instructions/9')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(mockInstructions)
  })
  // Failure 400
  it('should return 400', async () => {
    const res = await request(app).delete('/Instructions/abc')
    expect(res.statusCode).toEqual(400)
  })
  // Failure 404
  it('should return 404', async () => {
      instructionsRepository.deleteById.mockResolvedValue(null)
    const res = await request(app).delete('/Instructions/1')
    expect(res.statusCode).toEqual(404)
  })
  // Failure 500
  it('should return 500', async () => {
      instructionsRepository.deleteById.mockRejectedValue(new Error('Test error'))
    const res = await request(app).delete('/Instructions/1')
    expect(res.statusCode).toEqual(500)
  })
})
