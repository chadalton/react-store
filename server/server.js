var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var apiPort = 3004;
var db = mongoose.connect(
  "mongodb://localhost/swag-shop",
  { useNewUrlParser: true }
);
var cors = require("cors");
app.use(cors());

var Product = require("./model/product");
var WishList = require("./model/wishlist");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/product", function(req, res) {
  var product = new Product(req.body);
  product.save(function(err, savedProduct) {
    if (err) {
      res.status(500).send({ error: "Could not save product" });
    } else {
      res.send(savedProduct);
    }
  });
});

app.get("/product", function(req, res) {
  Product.find({}, function(err, products) {
    if (err) {
      res.status(500).send({ error: "Could not fetch products" });
    } else {
      res.send(products);
    }
  });
});

app.post("/wishlist", function(req, res) {
  var wishList = new WishList();
  wishList.title = req.body.title;

  wishList.save(function(err, newWishList) {
    if (err) {
      res.status(500).send("Could not create the WishList");
    } else {
      res.send(wishList);
    }
  });
});

app.get("/wishlist", function(req, res) {
  WishList.find({})
    .populate({ path: "products", model: "Product" })
    .exec(function(err, wishLists) {
      if (err) {
        res.status(500).send("Could not find wishlists");
      } else {
        res.send(wishLists);
      }
    });
});

app.put("/wishlist/product/add", function(req, res) {
  Product.findOne({ _id: req.body.productId }, function(err, product) {
    if (err) {
      res.status(500).send("Could not add product to wish list");
    } else {
      WishList.update(
        { _id: req.body.wishListId },
        { $addToSet: { products: product._id } },
        function(err, wishList) {
          if (err) {
            res.status(500).send("Could not add product to wish list");
          } else {
            res.send(wishList);
          }
        }
      );
    }
  });
});

app.listen(apiPort, function() {
  console.log("Swag Shop API running at port " + apiPort);
});
