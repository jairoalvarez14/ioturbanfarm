import { Router } from "express";
import { TempData } from "../models/data.model.js";

const router = Router();

router.get('/allData', async(req, res) => {
    try {
        const allData = await TempData.find().lean().sort({timestamp: -1});
        res.json(allData);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error!');
    }
});

export default router;