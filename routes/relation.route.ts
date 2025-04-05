import express from "express";
import {
  manyToManyRelationController,
  oneToManyRelationController,
  oneToOneRelationController,
} from "../controllers/relation.controller";
const routerRelation = express.Router();

// one to one relation
routerRelation.get("/one-to-one/:id", oneToOneRelationController);

// one to many relation
routerRelation.get("/one-to-many/:id", oneToManyRelationController);

// many to many relation
routerRelation.get("/many-to-many/:id", manyToManyRelationController);

export default routerRelation;
