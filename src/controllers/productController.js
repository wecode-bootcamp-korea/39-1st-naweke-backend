const { readProductInfo } = require('../services/productService');
const productService = require('../services/productService');

const loadProductInfo = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const productInfo = await readProductInfo(productId);
    return res.status(200).json({ productInfo });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const productsData = await productService.getProductList(req.query);
    res.status(200).json({ data: productsData });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { loadProductInfo, getAllProducts };
