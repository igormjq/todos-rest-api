const request = require('supertest');
const expect = require('expect');

const app = require('../server');
const Todo = require('../models/todo');


let dummyTodos = [
    { text: 'Some dummy data' },
    { text: 'More dummy data' }
];

// Cleans the database before each test case and adds dummy data
beforeEach(done => {
    Todo.remove({})
        .then(() => Todo.insertMany(dummyTodos))
        .then(() => done())
        .catch(e => done(e));
});

describe('POST /todos', () => {

    it('Should create a new todo', (done) => {
        let body = {
            text: 'Testing data'
        };

        request(app)
            .post('/todos')
            .send(body)
            .expect(201)
            .expect(res => {
                // res.body.data = returning object;
                expect(res.body.data.text).toBe(body.text);
            })
            .end((err, res) => {
                
                if(err)
                    return done(err);

                // Tests database
                Todo
                    .find({ text: body.text })
                        .then(todos => {
                            let testObject = todos[0].text;
    
                            expect(todos.length).toBe(1);
                            expect(testObject).toBe(body.text);
                            done();
                        })
                        .catch(e => done(e));
            });
    });

    it('Should not create todo with invalid data', done => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err)
                    return done(err);
                
                Todo
                    .find({})
                        .then(todos => {
                            expect(todos.length).toBe(2);
                            done();
                        })
                        .catch(e => done(e));
            });

    });
    
});

describe('GET /todos', () => {

    it('Should return a list of todos', done => {

        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos).toBeAn('array');
                expect(res.body.todos.length).toBeGreaterThanOrEqualTo(2);
            })
            .end(done);
    });
});