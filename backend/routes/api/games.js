const express = require('express')
const router = express.Router()
const { Boardgame, User } = require('../../db/models')

router.get('/:id', async(req, res, next) => {
    const game = await Boardgame.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'userId'],
        include: User
    })
    if (!game) {
        res.status(404)
        return res.json({
            message: 'The requested boardgame could not be found',
            statusCode: 404
        })
    }
    res.json(game)
})


module.exports = router;