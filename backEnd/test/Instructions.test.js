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
    // // Failure 400
    // it('should return 400', async () => {
    //     const res = await request(app).get('/Instructions/abc')
    //     expect(res.statusCode).toEqual(400)
    // })
    // Failure 500
    it('should return 500', async () => {
        instructionsRepository.findById.mockRejectedValue(new Error('Test error'))
        const res = await request(app).get('/Instructions/1')
        expect(res.statusCode).toEqual(500)
    })
})
// describe('POST /api/familyReunificationForm', () => {
//   beforeEach(() => jest.clearAllMocks())

//   // Success 200
//   it('should return 200', async () => {
//     const mockFamilyReunificationForm = {
//       _id: '65b79f7e5eb7a9d890b5b1f3',
//       id: 1,
//       citizenId: 123456789,
//       name: 'John Doe',
//       personalSituation: 'married',
//       gender: 'male',
//       email: 'john@gmail.com',
//       birthDate: '1989-12-31T22:00:00.000Z',
//       birthCountry: 'Israel',
//       address: 'Tel Aviv',
//       phone: '052-23456789',
//       marriageCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       CriminalInformationCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       recommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       recommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       passportImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png',
//       bankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       spousePassportImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       spouseBankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       familyRecommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       familyRecommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       childrenPassportImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       childrenPassportImg2: 'https://via.placeholder.com/500x500.png?text=White+Image'
//     }
//     restaurantsRepository.addFamilyReunificationForm.mockResolvedValue(mockFamilyReunificationForm)
//     const res = await request(app).post('/api/familyReunificationForm').send(mockFamilyReunificationForm)
//     expect(res.statusCode).toEqual(200)
//     expect(res.body).toEqual(mockFamilyReunificationForm)
//   })
//   // Failure 400
//   it('should return 400 data not provided', async () => {
//     const res = await request(app).post('/api/familyReunificationForm').send({})
//     expect(res.statusCode).toEqual(400)
//   })
//   it('should return 400 Invalid data', async () => {
//     const res = await request(app).post('/api/familyReunificationForm').send(
//       {
//         id: 1,
//         stars: 1
//       }
//     )
//     expect(res.statusCode).toEqual(400)
//   })
// })
// describe('PUT /api/familyReunificationForm/:id', () => {
//   beforeEach(() => jest.clearAllMocks())

//   // Success 200
//   it('should return 200', async () => {
//     const mockFamilyReunificationForm = {
//       _id: '65b79f7e5eb7a9d890b5b1f3',
//       id: 1,
//       citizenId: 123456789,
//       name: 'John Doe',
//       personalSituation: 'married',
//       gender: 'male',
//       email: 'john@gmail.com',
//       birthDate: '1989-12-31T22:00:00.000Z',
//       birthCountry: 'Israel',
//       address: 'Tel Aviv',
//       phone: '052-23456789',
//       marriageCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       CriminalInformationCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       recommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       recommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       passportImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png',
//       bankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       spousePassportImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       spouseBankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       familyRecommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       familyRecommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       childrenPassportImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       childrenPassportImg2: 'https://via.placeholder.com/500x500.png?text=White+Image'
//     }
//     restaurantsRepository.updateFamilyReunificationFormById.mockResolvedValue(mockFamilyReunificationForm)
//     const res = await request(app).put('/api/familyReunificationForm/1').send(mockFamilyReunificationForm)
//     expect(res.statusCode).toEqual(200)
//     expect(res.body).toEqual(mockFamilyReunificationForm)
//   })
//   // Failure 400
//   it('should return 400', async () => {
//     const res = await request(app).put('/api/familyReunificationForm/abc').send({})
//     expect(res.statusCode).toEqual(400)
//   })
//   // Failure 404
//   it('should return 404', async () => {
//     restaurantsRepository.updateFamilyReunificationFormById.mockResolvedValue(null)
//     const res = await request(app).put('/api/familyReunificationForm/1').send({})
//     expect(res.statusCode).toEqual(404)
//   })
//   // Failure 500
//   it('should return 500', async () => {
//     restaurantsRepository.updateFamilyReunificationFormById.mockRejectedValue(new Error('Test error'))
//     const res = await request(app).put('/api/familyReunificationForm/1').send({})
//     expect(res.statusCode).toEqual(500)
//   })
// })
// describe('DELETE /api/familyReunificationForm/:id', () => {
//   beforeEach(() => jest.clearAllMocks())

//   // Success 200
//   it('should return 200', async () => {
//     const mockFamilyReunificationForm = {
//       _id: '65b79f7e5eb7a9d890b5b1f3',
//       id: 1,
//       citizenId: 123456789,
//       name: 'John Doe',
//       personalSituation: 'married',
//       gender: 'male',
//       email: 'john@gmail.com',
//       birthDate: '1989-12-31T22:00:00.000Z',
//       birthCountry: 'Israel',
//       address: 'Tel Aviv',
//       phone: '052-23456789',
//       marriageCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       CriminalInformationCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       recommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       recommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       passportImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png',
//       bankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       spousePassportImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       spouseBankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       familyRecommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       familyRecommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       childrenPassportImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//       childrenPassportImg2: 'https://via.placeholder.com/500x500.png?text=White+Image'
//     }
//     restaurantsRepository.deleteFamilyReunificationFormById.mockResolvedValue(mockFamilyReunificationForm)
//     const res = await request(app).delete('/api/familyReunificationForm/1')
//     expect(res.statusCode).toEqual(200)
//     expect(res.body).toEqual(mockFamilyReunificationForm)
//   })
//   // Failure 400
//   it('should return 400', async () => {
//     const res = await request(app).delete('/api/familyReunificationForm/abc')
//     expect(res.statusCode).toEqual(400)
//   })
//   // Failure 404
//   it('should return 404', async () => {
//     restaurantsRepository.deleteFamilyReunificationFormById.mockResolvedValue(null)
//     const res = await request(app).delete('/api/familyReunificationForm/1')
//     expect(res.statusCode).toEqual(404)
//   })
//   // Failure 500
//   it('should return 500', async () => {
//     restaurantsRepository.deleteFamilyReunificationFormById.mockRejectedValue(new Error('Test error'))
//     const res = await request(app).delete('/api/familyReunificationForm/1')
//     expect(res.statusCode).toEqual(500)
//   })
// })
