const express = require("express");
require("./db/config");
const cors = require("cors");

const User = require("./db/User");
const Product=require("./db/Product");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result=result.toObject();
  delete result.password;
  return res.json(result);

});

// login route

app.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }
  let user = await User.findOne(req.body).select("-password");
  if (!user) {
    return res.status(400).json({
      error: "User not found",
    });
  } else {
    return res.json(user);
  }
});

// find data from database

app.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(users);
  });
});


// add product api

app.post("/addProduct",async (req,res)=>{
  const product=new Product(req.body);
  let result=await product.save();
  res.send(result);
})

// get all products api

app.get("/products",async (req,res)=>{
  let products=await Product.find();
  if(products.length===0){
    return res.status(400).json({
      error:"No products found"
    })
  }
  res.send(products);
})

// get product by id api


app.get("product/:id",async (req,res)=>{
  let product=await Product.findById(req.params.id);
  if(!product){
    return res.status(400).json({
      error:"Product not found"
    })
  }
  res.send(product);
})


// delete product api

app.delete("/product/:id",async (req,res)=>{
  let product=await Product.findByIdAndDelete(req.params.id);
  if(!product){
    return res.status(400).json({
      error:"Product not found"
    })
  }
  res.send(product);
}
)






app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
