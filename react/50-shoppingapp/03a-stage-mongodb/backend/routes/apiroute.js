const express = require("express");
const itemModel = require("../models/item");

let router = express.Router();

//REST API

router.get("/shopping",function(req,res) {
	let query = {"user":req.session.user};
	if(req.query.type) {
		query["type"] = req.query.type.toLowerCase();
	}
	if(req.query.price) {
		query["price"]= {$lte:req.query.price}
	}
	itemModel.find(query,function(err,items) {
		if(err) {
			console.log("Failed to find items. Reason:",err)
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json(items);
	})
});

router.post("/shopping",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"});
	}
	let item = new itemModel({
		user:req.session.user,
		type:req.body.type.toLowerCase(),
		count:req.body.count,
		price:req.body.price
	})
	item.save(function(err) {
		if(err) {
			console.log("Failed to save item. Reason:",err)
			return res.status(500).json({message:"Internal server error"})
		}	
		return res.status(201).json({message:"success!"});
	})
})

router.delete("/shopping/:id",function(req,res) {
	itemModel.deleteOne({"_id":req.params.id,"user":req.session.user}, function(err){
		if(err) {
			console.log("Failed to remove item id:"+req.params.id+". Reason:",err)
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json({message:"success"});
	})
})

router.put("/shopping/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"});
	}
	let item = {
		user:req.session.user,
		type:req.body.type.toLowerCase(),
		count:req.body.count,
		price:req.body.price
	}
	itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},item,function(err,response){
		if(err) {
			console.log("Failed to edit item id:"+req.params.id+". Reason:",err)
			return res.status(500).json({message:"Internal server error"})
		}
		if(!response.nModified) {
			return res.status(404).json({message:"not found"})
		}
		return res.status(200).json({message:"success"});
	})
})

module.exports = router;