const { Router } = require("express");
const handlerWrapper = require("../middlewares/handlerWrap");
const userModel = require("../model/user");
const { comparePassword, encryptPassword } = require("../utils/encryptPassword");
const CustomError = require("../utils/customError");
const { CustomResponse } = require("../utils/customResponse");

const router = Router();

router.get("/login", handlerWrapper(async (req, res) => {
    const query = req.query;

    if (!query.email || !query.password)
        throw new CustomError(401, "Email and password are required");

    const matchedUser = await userModel.findByEmail(query.email);

    if (matchedUser.length == 0)
        throw new CustomError(404, `Can't find user with email ${query.email}`);

    const passwordMatched = await comparePassword(query.password, matchedUser[0].password);
    // Check if password matches
    if (!passwordMatched)
        throw new CustomError(401, "Incorrect Password");

    const customResponse = new CustomResponse(
        200,
        "Ok",
        matchedUser
    );

    res.status(customResponse.statusCode).json(customResponse);
}));

router.post("/register", handlerWrapper(async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password
    } = req.body;

    if (!firstname || !lastname || !email || !password)
        throw new CustomError(400, "Firstname, Lastname, Email and Password are required");

    const matchedUser = await userModel.findByEmail(email);

    if (matchedUser.length > 0)
        throw new CustomError(409, "Email already taken");

    // Encrypt password
    const encryptedPassword = await encryptPassword(password);
    const newUser = {
        firstname,
        lastname,
        email,
        password: encryptedPassword
    };
    const customResponse = new CustomResponse(201,
        "Registration successful",
        newUser);

    // Insert data into the database
    userModel.insert(newUser);

    res.status(customResponse.statusCode).json(customResponse);
}));

router.patch("/update/:id", handlerWrapper(async (req, res) => {
    const { firstname, lastname } = req.body;
    const id = req.params.id;

    await userModel.updateById(id, { firstname, lastname });

    const user = await userModel.findById(id);
    const customResponse = new CustomResponse(
        200,
        "User successfully updated",
        user
    );

    res.status(customResponse.statusCode).json(customResponse);
}));

router.delete("/remove/:id", async (req, res) => {
    const id = req.params.id;

    await userModel.deleteById(id);

    const customResponse = new CustomResponse(
        200,
        "User successfully Deleted",
    );

    res.status(customResponse.statusCode).json(customResponse);
});

module.exports = router;
