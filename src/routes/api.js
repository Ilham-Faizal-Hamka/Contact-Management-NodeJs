import express from "express";
import userController from "../controllers/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import contactContrtoller from "../controllers/contact-contrtoller";
import addressController from "../controllers/address-controller";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// user routes
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// contact routes
userRouter.post("/api/contacts", contactContrtoller.create);
userRouter.get("/api/contacts/:contactId", contactContrtoller.get);
userRouter.put("/api/contacts/:contactId", contactContrtoller.update);
userRouter.delete("/api/contacts/:contactId", contactContrtoller.remove);
userRouter.get("/api/contacts", contactContrtoller.search);

// address routes
userRouter.post('/api/contacts/:contactId/addresses', addressController.create);
userRouter.get('/api/contacts/:contactId/addresses/:addressId', addressController.get);
userRouter.put('/api/contacts/:contactId/addresses/:addressId', addressController.update);
userRouter.delete('/api/contacts/:contactId/addresses/:addressId', addressController.remove);


export {
    userRouter
};