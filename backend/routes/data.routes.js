import { Router } from "express";
import { TempData } from "../models/data.model.js";

const router = Router();

router.get('/allData', async(req, res) => {
    const {page = 1, limit = 25} = req.query;
    try {
        const allData = await tempData.find().lean().sort({timestamp: -1}).limit(limit * 1).skip((page - 1) * limit).exec();
        const count = await tempData.countDocuments();

        res.json({
            allData,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        console.log(error);
    }
})

export default router;
