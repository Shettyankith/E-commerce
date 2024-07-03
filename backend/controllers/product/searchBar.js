const Product = require("../../models/productModel");

const searchBar = async (req, res) => {
  try {
    const query = req.query.q;
    let product = [];

    if (query === '') {
      product = await Product.find();
    } else {
      
      const regex = new RegExp(query, "i");
      
      product = await Product.find({
        $or: [
          { productName: { $regex: regex } },
          { category: { $regex: regex } }
        ],
      });
     
    }

    res.json({
      data: product,
      message: "Search products fetched",
      error: false,
      success: true,
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(400).json({
      error: true,
      success: false,
      message: e.message || "Internal server error!!",
    });
  }
};

module.exports = searchBar;
