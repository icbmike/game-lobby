import express, { Request, Response } from "express";
import { cyan } from "colors/safe";

const app = express();

app.get("/ping", (_: Request, res: Response) => {
  res.status(200).send("Alive!");
});

console.log(cyan("Running on port 3001"));
app.listen(3001);
