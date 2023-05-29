const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

// GET /api/tags
router.get('/', async (req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one tag api/tags/1
router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{ model: Product }],
        });
        if (!tagData) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST create new tag api/tags
router.post('/', async (req, res) => {
    try {
        const tagData = await Tag.create(req.body);
        res.status(200).json(tagData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT update tag api/tags/1
router.put('/:id', async (req, res) => {
    try {
        const tagData = await Tag.update(req.body, {
            where: { id: req.params.id },
        });
        if (!tagData[0]) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE tag api/tags/1
router.delete('/:id', async (req, res) => {
    try {
        const tagData = await Tag.destroy({
            where: { id: req.params.id },
        });
        if (!tagData) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;