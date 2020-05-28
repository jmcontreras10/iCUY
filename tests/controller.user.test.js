const create = require("../controllers/users").create;
const validateE = require("../controllers/users").validateEmailExp;
const connectDB = require("../util/dbManager").mongoConnect;




describe('User creation', () => {
    it('Should return the same user result', async () => {

        await connectDB();

        const user = {
            name: "Test user",
            email: "email@test.com",
            password: "apassword"
        };

        await create(user)
            .then(res => {
                expect(res.ops[0].name).toBe(user.name);
            });

    })
});

describe('Validate an Email', () => {
    it('Must be valid', () => {

        const email = "testmail@test.com";
        expect(validateE(email)).toBe(undefined);
    })
});