import { NextFunction, Request, Response } from "express";
import db from "../../db/models";
const router = require('express').Router();
const { Comment, User, Song } = db;
import { check } from "express-validator";
import { handleValidationErrors } from "../../utils/validation";
import { CustomeRequest } from "../../typings/express";
import { requireAuth } from "../../utils/auth";

const validateCreateUpdateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Comment is required and must be between 1 and 1000 characters'),
    handleValidationErrors,
]

// GET ALL COMMENTS BY SONGID
router.get('/songs/:songId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { songId } = req.params;
        
        const comments = await Comment.findAll({
            where: {
                songId: parseInt(songId)
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(comments);
    } catch (error) {
        next(error);
    }
});

// CREATE A COMMENT
router.post('/', requireAuth, validateCreateUpdateComment, async (req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const { songId, comment } = req.body;

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const song = await Song.findByPk(songId);
        if (!song) {
            return res.status(404).json({
                message: "Song couldn't be found"
            });
        }

        const newComment = await Comment.create({
            userId: req.user.id,
            songId: parseInt(songId),
            comment
        });

        const result = await Comment.findByPk(newComment.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// EDIT A COMMENT
router.put('/:commentId', requireAuth, validateCreateUpdateComment, async (req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const commentToUpdate = await Comment.findByPk(commentId);

        if (!commentToUpdate) {
            return res.status(404).json({
                message: "Comment couldn't be found"
            });
        }

        if (req.user.id !== commentToUpdate.userId) {
            return res.status(403).json({
                message: "You do not own this comment"
            });
        }

        await commentToUpdate.update({
            comment
        });

        const updatedComment = await Comment.findByPk(commentId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        });

        res.json(updatedComment);
    } catch (error) {
        next(error);
    }
});

// DELETE A COMMENT
router.delete('/:commentId', requireAuth, async (req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const { commentId } = req.params;

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const commentToDelete = await Comment.findByPk(commentId);

        if (!commentToDelete) {
            return res.status(404).json({
                message: "Comment couldn't be found"
            });
        }

        if (req.user.id !== commentToDelete.userId) {
            return res.status(403).json({
                message: "You do not own this comment"
            });
        }

        await commentToDelete.destroy();

        return res.status(200).json({
            message: "Successfully deleted"
        });
    } catch (error) {
        next(error);
    }
});

export = router;