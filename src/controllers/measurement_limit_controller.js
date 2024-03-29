const MeasurementLimitModel = require("../models/measurement_limit_model");

const MeasurementLimitController = {
    //For Creating Measurement Limit
    createMeasurementLimit: async function(req,res){
        try{
            const measurementLimitData = req.body;
            const newMeasurementLimit = new MeasurementLimitModel(measurementLimitData);
            
            await newMeasurementLimit.save();
            return res.json({success:true,message:"Measurement Limit created",data:newMeasurementLimit });
            
        }
        catch(ex){
            return res.json({success:false,message:ex});
        }
    },
    //For Getting all measurement limit data

    fetchAllMeasurementLimit: async function(req,res){
        try{
            const measurementLimit =  await MeasurementLimitModel.find();
           return res.json({success:true,data: measurementLimit});
}
        catch(ex){
            return res.json({success:false,message:ex});
}
    },
    //For fetching measurement limit by id
    fetchMeasurementLimitById: async function(req,res){
        try{
            const id = req.params.id;
            const foundMeasurementLimit = await MeasurementLimitModel.findById(id);
            if(!foundMeasurementLimit){
                return res.json({success:false,message:"Measurement Limit not found"});
              }
          return res.json({success:true,data:foundMeasurementLimit});
          }
        catch(ex){
            return res.json({success:false,message:ex});

        }
    }

};
module.exports = MeasurementLimitController;