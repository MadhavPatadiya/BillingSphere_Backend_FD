const HSNModel = require("../models/hsn_code_model");

const HsnCodeController = {
    //For Creating HSN Code
    createHsnCode: async function(req,res){
        try{
            const hsnCodeData = req.body;
            const newHSNCode = new HSNModel(hsnCodeData);
            await newHSNCode.save();
            return res.json({success:true,message:"Product Category Created",data:newHSNCode});
            
        }
        catch(ex){
            return res.json({success:false,message:ex});
        }
    },
    //For Getting all hsn code

    fetchAllHsnCode: async function(req,res){
        try{
            const hsnCode = await HSNModel.find();
          return res.json({success:true,data: hsnCode});
}
        catch(ex){
            return res.json({success:false,message:ex});

        }
    },
    //For fetching hsn code by id
    fetchHsnCodeById: async function(req,res){
        try{
            const id = req.params.id;
            const foundHSNCode = await HSNModel.findById(id);
            if(!foundHSNCode){
                return res.json({success:false,message:"HSN code not found"});
              }
          return res.json({success:true,data:foundHSNCode});
          

        }
        catch(ex){
            return res.json({success:false,message:ex});

        }
    }

};
module.exports = HsnCodeController;

