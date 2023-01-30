import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const mealsRouter = Router();

mealsRouter
  .all("/*", authenticateToken)
  .get("/");
export { mealsRouter };
