const mongoose = require("mongoose");

const Vendor = mongoose.model("vendor");

module.exports.registerVendor = (req, res, next) => {
  var vendor = new Vendor(req.body);
  // vendor.name = req.body.name;
  // vendor.userName = req.body.userName;
  // vendor.email = req.body.email;
  // vendor.password = req.body.password;
  // vendor.contact = req.body.contact;
  // vendor.gstin = req.body.gstin;
  vendor.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      //error handling
      if (err.code == 11000)
        res.status(422).send(["Duplicate email adrress found."]);
      else return next(err);
    }
  });
};
