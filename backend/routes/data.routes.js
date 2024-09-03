import { Router } from "express";
import { TempData } from "../models/data.model.js";

const router = Router();

router.get('/allData', async(req, res) => {
    const {page = 1, limit = 25} = req.query;
    try {
        const allData = await TempData.find().lean().sort({timestamp: -1}).limit(limit * 1).skip((page - 1) * limit).exec();
        const count = await TempData.countDocuments();

        res.json({
            allData,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!');
    }
});

export default router;
