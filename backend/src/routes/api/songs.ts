import { NextFunction, Request, Response } from "express";
import db from "../../db/models";
const router = require('express').Router();
const { Song, User } = db;
import { check } from 'express-validator'
import { handleValidationErrors } from "../../utils/validation";
import { singlePublicFileUpload, singleMulterUpload} from '../../awsS3'
import { CustomeRequest } from "../../typings/express";
import { requireAuth } from "../../utils/auth";

const validateCreateSong = [
    check('title')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage('Song title is required and must be less than 100 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 500 })
        .withMessage('Description is required and mus be less than 500 characters'),
    check('previewImage')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isURL()
        .withMessage('Preview image must be a valid URL'),
    handleValidationErrors,
]

// POST A SONG
router.post('/', singleMulterUpload('songFile'), validateCreateSong, async (req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const { title, description, previewImage } = req.body;

                
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const ownerId = req.user.id;

        if (!req.file) {
            return res.status(400).json({
                message: "Song file is required"
            })
        }

        // send file to bucket
        const filepath = await singlePublicFileUpload(req.file);

        const song = await Song.create({
            ownerId,
            title,
            description,
            previewImage,
            filepath,
            duration: 0
        });

        const result = {
            id: song.id,
            ownerId: song.ownerId,
            title: song.title,
            description: song.description,
            previewImage: song.previewImage,
            filepath: song.filepath,
            duration: song.duration,
            createdAt: song.createdAt,
            updatedAt: song.updatedAt
        };
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
})


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
  
// EDIT A SONG 


router.put('/:songId', requireAuth, validateCreateSong, async (req: CustomeRequest, res: Response, next: NextFunction) => {
    const { songId } = req.params;
    const { title, description, previewImage } = req.body;

    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const songToUpdate = await Song.findByPk(songId);

    if (!songToUpdate) {
        return res.status(404).json({
            message: "Song couldn't be found"
        })
    }

    if (req.user.id !== songToUpdate.ownerId) {
        return res.status(403).json({
            message: "You do not own this song"
        })
    }

    await songToUpdate.update({
        title: title,
        description: description,
        previewImage: previewImage,
    });

    return res.status(200).json(songToUpdate)
})



// DELETE A SONG
router.delete('/:songId', requireAuth, async (req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const { songId } = req.params;
        if (!req.user) {
            return res.status(404).json({
                message: "Unauthorized"
            })
        }

        const songToDelete = await Song.findByPk(songId);

        if (!songToDelete) {
            return res.status(404).json({
                message: "Song couldn't be found"
            })
        }

        if (req.user.id !== songToDelete.ownerId) {
            return res.status(403).json({
                message: "You do not own this song"
            });
        }

        await songToDelete.destroy();

        return res.status(200).json({
            message: "Successfully deleted"
        })
    } catch (error) {
        next(error)
    }
})

export = router