import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import addressesRoutes from "./routes/addresses.routes";
import projectRoutes from "./routes/projects.routes";
import sessionsRoutes from "./routes/session.routes";
import { technologiesRoutes } from "./routes/technologies.routes";
import userRoutes from "./routes/users.routes";

const app = express();

app.use(express.json());

app.use("/login", sessionsRoutes);
app.use("/users", userRoutes);
app.use("/addresses", addressesRoutes);
app.use("/projects", projectRoutes);
app.use("/technologies", technologiesRoutes);

app.use(handleError);

export default app;
