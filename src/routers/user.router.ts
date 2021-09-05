import { Router } from 'express'
import { User } from '../entities/user'
    import { HttpException } from '../helpers/httpException'

const router = Router()

router.get('/user/:id', async (req, res, next) => {
    try {
        const result = await User.findOne({ id: req.params.id })
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

router.get('/user', async (req, res, next) => {
    try {
        const result = await User.find()
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }

})


router.post('/user', async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await User.insert(req.body)
        if (result) {
            res.json(result);
        }
    } catch (error) {
        next(error)
    }
})

router.put('/user/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id) {
            const result = await User.update({ id }, { ...req.body });
            if (result) {
                res.json(result);
            }
        } else {
            throw new HttpException(500, 'id undefined');
        }
    } catch (error) {
        return next(error);
    }
})

router.delete('/user/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id) {
            const result = await User.delete({ id });
            return res.status(200).json(result);
        } else {
            throw new HttpException(500, 'id undefined');
        }
    } catch (error) {
        next(error)
    }

})

export default router;