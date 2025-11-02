import SubCategoryModel from "../models/subCategory.model.js";


export const AddSubCategoryController = async(req,res) => {
   try {
      const { name, image, category } = req.body;

      if(!name && !image && !category[0]) {
        return res.status(400).json({
          message: "Please fill all the fields",
          success: false,
          error: true,
        });
      }

      const payload = {
         name,
         image,
         category
      }

      const addSubCategory = new SubCategoryModel(payload)
      const save = await addSubCategory.save();

      return res.json({
        message: "Sub Category Added Successfully",
        data: save,
        success: true,
        error: false,
      });

   } catch (error) {
       return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
   }
}

export const getSubCategoryController = async (req, res) => {
  try {
    const getSubCategory = await SubCategoryModel.find().sort({ createdAt: -1 }).populate("category")

    return res.json({
      message: "Sub Category found successfully",
      data: getSubCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;

    const checkSub = await SubCategoryModel.findById( _id)

    if(!checkSub) {
      return res.status(400).json({
        message: "Sub Category not found",
        error: true,
        success: false,
      });
    }

    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id,
      {
        name,
        image,
        category
      }
    );

    return res.json({
      message: "Sub Category Updated successfully",
      data: updateSubCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;

    const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(_id);

    return res.json({
      message: "Sub Category Deleted successfully",
      data: deleteSubCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};