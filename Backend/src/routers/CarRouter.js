import { Router } from 'express';
import { changeBookedFlag, getSearchCarids, getSearchData, getTopData } from '../controller/CarController.js';

const CarRouter = Router();

CarRouter.get("/data/top5", getTopData);
CarRouter.get("/data/search/:city/:type", getSearchCarids);
CarRouter.post("/data/search/cardata", getSearchData);
CarRouter.put("/data/changeflag", changeBookedFlag);

export default CarRouter;