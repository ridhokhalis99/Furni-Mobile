const router = require("express").Router();
const Controller = require("../controllers");
const errorHandler = require("../middlewares/errorHandler");

router.get("/products", Controller.readAllProducts);
router.post("/products/add", Controller.createProduct);
router.get("/products/:slug", Controller.readProductBySlug);
router.put("/products/:slug", Controller.updateProduct);
router.delete("/products/:slug", Controller.deleteProduct);
router.delete(
  "/products/users/:userMongoId",
  Controller.deleteProductByMongoId
);
<<<<<<< HEAD
=======
router.get("/categories", Controller.readAllCategories);
router.post("/categories/add", Controller.createCategory);
router.get("/categories/:categoryId", Controller.readCategoryById);
router.put("/categories/:categoryId/edit", Controller.updateCategory);
router.delete("/categories/:categoryId/delete", Controller.deleteCategory);
>>>>>>> 43a63be (add: cascade when delete user and include user when read product by slug)
router.use(errorHandler);

module.exports = router;
