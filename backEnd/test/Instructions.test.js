// const request = require('supertest')
// const app = require('../index')
// const instructionsRepository = require('../repositories/Instructions.repository')
// require('dotenv').config()

// jest.mock('../repositories/Instruction.repository')
// describe('GET /api/familyReunificationForm', () => {
//   beforeEach(() => jest.clearAllMocks())

//   // Success 200
//   it('should return 200', async () => {
//     const mockFamilyReunificationForm = [
//       {
//         _id: '65b79f7e5eb7a9d890b5b1f3',
//         id: 1,
//         citizenId: 123456789,
//         name: 'John Doe',
//         personalSituation: 'married',
//         gender: 'male',
//         email: 'john@gmail.com',
//         birthDate: '1989-12-31T22:00:00.000Z',
//         birthCountry: 'Israel',
//         address: 'Tel Aviv',
//         phone: '052-23456789',
//         marriageCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         CriminalInformationCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         recommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         recommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         passportImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png',
//         bankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         spousePassportImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         spouseBankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         familyRecommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         familyRecommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         childrenPassportImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         childrenPassportImg2: 'https://via.placeholder.com/500x500.png?text=White+Image'
//       },
//       {
//         _id: '65b79f7e5eb7a9d890b5b1f7',
//         id: 5,
//         citizenId: 345678901,
//         name: 'Michael Brown',
//         personalSituation: 'married',
//         gender: 'male',
//         email: 'michael@gmail.com',
//         birthDate: '1995-03-11T22:00:00.000Z',
//         birthCountry: 'Australia',
//         address: 'Sydney',
//         phone: '765-4321098',
//         marriageCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         CriminalInformationCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         recommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         recommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         passportImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png',
//         bankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         spousePassportImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         spouseBankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         familyRecommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         familyRecommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         childrenPassportImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         childrenPassportImg2: 'https://via.placeholder.com/500x500.png?text=White+Image'
//       },
//       {
//         _id: '65b79f7e5eb7a9d890b5b1f4',
//         id: 2,
//         citizenId: 987654321,
//         name: 'Jane Smith',
//         personalSituation: 'divorced',
//         gender: 'female',
//         email: 'jane@gmail.com',
//         birthDate: '1985-05-14T21:00:00.000Z',
//         birthCountry: 'USA',
//         address: 'New York',
//         phone: '123-4567890',
//         marriageCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         CriminalInformationCertificateImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         recommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         recommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         passportImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png',
//         bankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         spousePassportImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         spouseBankStatementImg: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         familyRecommendationLetterImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         familyRecommendationLetterImg2: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         childrenPassportImg1: 'https://via.placeholder.com/500x500.png?text=White+Image',
//         childrenPassportImg2: 'https://via.placeholder.com/500x500.png?text=White+Image'
//       }
//     ]
//     restaurantsRepository.getFamilyReunificationForms.mockResolvedValue(mockFamilyReunificationForm)
//     const res = await request(app).get('/api/familyReunificationForm')
//     expect(res.statusCode).toEqual(200)
//     expect(res.body).toEqual(mockFamilyReunificationForm)
//   })

//   // Failure 404
//   it('should return 404', async () => {
//     const mockFamilyReunificationForm = []
//     restaurantsRepository.getFamilyReunificationForms.mockResolvedValue(mockFamilyReunificationForm)
//     const res = await request(app).get('/api/familyReunificationForm')
//     expect(res.statusCode).toEqual(404)
//   })

//   // Failure 500
//   it('should return 500', async () => {
//     restaurantsRepository.getFamilyReunificationForms.mockRejectedValue(new Error('Test error'))
//     const res = await request(app).get('/api/familyReunificationForm')
//     expect(res.statusCode).toEqual(500)
//   })
// })
// describe('GET /api/familyReunificationForm/:id', () => {
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
//     restaurantsRepository.getFamilyReunificationFormById.mockResolvedValue(mockFamilyReunificationForm)
//     const res = await request(app).get('/api/familyReunificationForm/1')
//     expect(res.statusCode).toEqual(200)
//     expect(res.body).toEqual(mockFamilyReunificationForm)
//   })
//   // Failure 404
//   it('should return 404', async () => {
//     restaurantsRepository.getFamilyReunificationFormById.mockResolvedValue(null)
//     const res = await request(app).get('/api/familyReunificationForm/1')
//     expect(res.statusCode).toEqual(404)
//   })
//   // Failure 400
//   it('should return 400', async () => {
//     const res = await request(app).get('/api/familyReunificationForm/abc')
//     expect(res.statusCode).toEqual(400)
//   })
//   // Failure 500
//   it('should return 500', async () => {
//     restaurantsRepository.getFamilyReunificationFormById.mockRejectedValue(new Error('Test error'))
//     const res = await request(app).get('/api/familyReunificationForm/1')
//     expect(res.statusCode).toEqual(500)
//   })
// })
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
