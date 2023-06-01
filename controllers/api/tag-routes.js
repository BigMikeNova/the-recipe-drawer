const router = require('express').Router();
const { RecipeTag, Recipe } = require('../../models');

// The `/tags` endpoint

// GET /tags
router.get('/', async (req, res) => {
    try {
        const tagData = await RecipeTag.findAll({
            include: [{ model: Recipe }],
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one tag tags/1
router.get('/:id', async (req, res) => {
    try {
        const tagData = await RecipeTag.findByPk(req.params.id, {
            include: [{ model: Recipe }],
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

// POST create new tag tags
router.post('/', async (req, res) => {
    try {
        const tagData = await RecipeTag.create(req.body);
        res.status(200).json(tagData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT update tag tags/1
router.put('/:id', async (req, res) => {
    try {
        const tagData = await RecipeTag.update(req.body, {
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

// DELETE tag tags/1
router.delete('/:id', async (req, res) => {
    try {
        const tagData = await RecipeTag.destroy({
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