const { appDataSource } = require('./dataSource');

// 값 이미 있으면 1리턴, 없으면 0
const checkIfSameProduct = async (userId, productOptionId) => {
  const check = await appDataSource.query(
    `
        SELECT EXISTS
        (SELECT * FROM carts
        WHERE user_id = ? AND product_option_id = ?)
        AS 'checkProduct';
        `,
    [userId, productOptionId]
  );
  return check;
};

const selectProductOptionId = async (productId, sizeId) => {
  const productOptionId = await appDataSource.query(
    `
    SELECT * FROM product_options 
    WHERE product_options.product_id = ?
    AND 
    product_options.size_id = ?;
    `,
    [productId, sizeId]
  );
  return productOptionId;
};

const insertProduct = async (userId, productOptionId) => {
  await appDataSource.query(
    `
    INSERT INTO carts(
      user_id,
      product_option_id,
      quantity
    ) VALUES (?, ?, 1);
    `,
    [userId, productOptionId]
  );
};

const addQuantity = async (userId, productOptionId) => {
  await appDataSource.query(
    `UPDATE carts 
    SET quantity = quantity + 1 
    WHERE user_id = ? 
    AND 
    product_option_id = ?
    AND
    quantity < 7;
    `,
    [userId, productOptionId]
  );
};

const selectQuantity = async (userId, productOptionId) => {
  const quantity = appDataSource.query(
    `
    SELECT quantity
    FROM carts
    WHERE user_id = ? AND product_option_id = ?;
    `,
    [userId, productOptionId]
  );
  return quantity;
};

const getCarts = async (userId) => {
  const product = await appDataSource.query(
    `
    SELECT p.name productName, p.thumbnail_image_url thumbnailImageUrl, po.price, c.name colorName, s.name sizeName, carts.quantity, po.id productOptionId, carts.id cartId
    FROM carts 
    LEFT JOIN product_options po ON carts.product_option_id = po.id 
    LEFT JOIN products p ON po.product_id = p.id 
    LEFT JOIN colors c ON po.color_id = c.id 
    LEFT JOIN sizes s ON po.size_id = s.id 
    WHERE user_id = ?
    `,
    [userId]
  );
  return product;
};

const modifyQuantity = async (userId, quantity, cartId) => {
  const modify = await appDataSource.query(
    `UPDATE carts 
    SET quantity = ?
    WHERE user_id = ? AND id = ?;
    `,
    [quantity, userId, cartId]
  );
  return modify.affectedRows;
};

const deleteCart = async (userId, cartIds) => {
  const ifDeleted = await appDataSource.query(
    `
    DELETE FROM carts 
    WHERE user_id=?
    AND
    id IN (?)
    `,
    [userId, cartIds]
  );
  return ifDeleted.affectedRows;
};

module.exports = {
  checkIfSameProduct,
  selectProductOptionId,
  insertProduct,
  deleteCart,
  getCarts,
  addQuantity,
  modifyQuantity,
  selectQuantity,
};
