import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCateogoryControllers = async(req, res) => {
    try {
        const {name} = req.body;
        if(!name) {
            res.status(404).send({message : "Category doesn't exist"});

        }

        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory) {
            return res.status(200).send({
                success: true,
                message : "Category already exits",
                error
            })
        }

        const category =  await new categoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message : "New Category",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message : "Category Error",
            error
        })
    }
}

export const updateCategoryControllers = async(req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
        res.status(200).send({
            success:true,
            message : "Update category successfully",
            category
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message : "Something went wrong",
            error
        })
    }
}

// get all  categotry controllers 

export const categoryControllers = async(req,res) => {
    try {

        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message : "Get all category",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message : "Something went wrong",
            error
        })
    }
}

// get single category 

export const singleCategoryControllers = async(req, res) => {
    try {

        const category = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message : "Fetched single category  successfully",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message : "Something went wrong",
            error
        })
    }
}

// delete category 

export const deleteCategoryControllers = async(req, res) => {
    try {
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message : "Delete category successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message : "Somethin went wrong while deleting",
            error,
        })
    }
}