import { Express } from "express";

import pingRoute from "./ping.route";
import videosRoute from "./video.route";

const routes = (app: Express) => {
	app.use("/ping", pingRoute);
	app.use("/videos", videosRoute);

	return app;
};

export default routes;
