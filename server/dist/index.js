import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.get("/nishu", function (req, res) {
    return res.json({
        msg: "hello nishu. every this is working fine"
    });
});
app.listen(process.env.PORT, () => {
    console.log("Your application is running on localhost:3001");
});
//# sourceMappingURL=index.js.map