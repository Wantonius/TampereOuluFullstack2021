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
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user !== req.session.user) {
				return res.status(401).json({message:"You are not authorized to remove this object"});
			}
			database.splice(i,1);
			return res.status(200).json({message:"success!"})
		}
	}
	return res.status(404).json({message:"not found!"})
})

router.put("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let item = {
		...req.body,
		id:tempId,
		user:req.session.user
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user !== req.session.user) {
				return res.status(401).json({message:"You are not authorized to edit this object"});
			}			
			database.splice(i,1,item);
			return res.status(200).json({message:"success!"})
		}
	}
	return res.status(404).json({message:"not found!"})
})

module.exports = router;