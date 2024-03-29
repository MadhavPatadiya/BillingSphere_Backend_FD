const SecondaryUnitModel = require("../models/secondaryunit_model");

const SecondaryUnitController = {
    //For creating secondart unit
    createSecondaryUnit: async function(req,res){
        try{
            const createSecondaryUnitData = req.body;
            const newSecondaryUnitData= new SecondaryUnitModel(createSecondaryUnitData);
            await newSecondaryUnitData.save();
           return res.json({success:true,message:"Secondary unit has been created",data:newSecondaryUnitData});
        }
        catch(ex){
            return res.json({success:false,message:ex});
        }

    },
    //For fetching all secondary unit
fetchAllSecondaryUnit: async function(req,res){
    try{
        const fetchSecondaryUnit = await SecondaryUnitModel.find();
        return res.json({success:true,data:fetchSecondaryUnit});
        
    }
    catch(ex){
        return res.json({success:false,message:ex});
    }

},
//For fetching secondary unit by id
fetchSecondaryUnitById: async function(req,res){
    try{

        const id = req.params.id;
        const foundSecondaryUnit = await SecondaryUnitModel.findById(id);
        if(!foundSecondaryUnit){
            return res.json({success:false,message:"Secondary unit category not found"});
          }
      return res.json({success:true,data:foundSecondaryUnit});
    }
    catch(ex){
        return res.json({success:false,message:ex});
    }

}
};
module.exports = SecondaryUnitController;