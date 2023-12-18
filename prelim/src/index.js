const express = require("express");
const userRouter = require("./routes/user");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRouter);
app.use(errorHandler);

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);
