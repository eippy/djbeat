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

// GET SONG BY ID
router.get('/:songId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { songId } = req.params;
        const song = await Song.findByPk(parseInt(songId), {
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'username']
                }
            ]
        });
        
        if (!song) {
            return res.status(404).json({
                message: "Song couldn't be found"
            })
        }

        const result = {
            id: song.id,
            ownerId: song.ownerId,
            title: song.title,
            description: song.description,
            previewImage: song.previewImage,
            filepath: song.filepath,
            duration: song.duration,
            createdAt: song.createdAt,
            updatedAt: song.updatedAt,
            User: song.user
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
})

export = router