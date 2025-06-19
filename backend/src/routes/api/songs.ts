import { NextFunction, Request, Response } from "express";
import db from "../../db/models";
const router = require('express').Router();
const { Song, User } = db;


// GET ALL SONGS
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const songs = await Song.findAll({
            attributes: [
                'id',
                'ownerId',
                'title',
                'description',
                'previewImage',
                'filepath',
                'duration',
                'createdAt',
                'updatedAt'
            ],
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'username']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(songs);
    } catch (error) {
        next(error);
    }
})



export = router