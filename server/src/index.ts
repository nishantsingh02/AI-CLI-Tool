import express from "express";
import dotenv from "dotenv"
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

// for test the authentication layer
app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});


app.get("/nishu", function(req,res){
    return res.json({
        msg: "hello nishu. every this is working fine"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Your application is running on http://localhost:${process.env.PORT}`)
});