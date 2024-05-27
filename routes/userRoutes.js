const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Home route
router.get("/", userController.renderHome);

// Login route
router.get("/login", userController.renderLogin);

// Register route
router.get("/registro", userController.renderRegistro);

// Admin route
router.get("/admin", userController.renderAdmin);

// User data routes
router.get("/perfil", userController.getUserData);
router.put("/perfil", userController.updateUserData);

// User registration route
router.post("/registro", userController.registerUser);

// Get all users route
router.get("/usuarios", userController.getAllUsers);

// Update user status route
router.put("/usuarios", userController.updateUserStatus);

// Verify user route
router.post("/verify", userController.verifyUser);

// Delete user route
router.delete("/eliminar_cuenta/:email", userController.deleteUser);

module.exports = router;
