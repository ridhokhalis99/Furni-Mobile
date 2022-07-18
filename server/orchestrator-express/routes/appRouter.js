const router = require("express").Router();
const AppRouter = require("../controllers/appController");

router.get("/products", AppRouter.readAllProducts);
router.post("/products/add", AppRouter.createProduct);
router.get("/products/:slug", AppRouter.readProductBySlug);
router.put("/products/:slug", AppRouter.editProductBySlug);
router.delete("/products/:slug", AppRouter.deleteProductBySlug);

module.exports = router;
