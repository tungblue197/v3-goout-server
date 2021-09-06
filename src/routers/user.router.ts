import { Router } from 'express'
import { Location } from '../entities/location'
import { User } from '../entities/user'
    import { HttpException } from '../helpers/httpException'
import httpRespone from '../helpers/httpRespone'

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

router.get('/user/getLocationByUserId/:id', async (req, res, next) => {
    const { id } = req.params;
    if(id){
        const user = await User.findOne({ id }, {relations: ['location']})
        if(user){
            return res.status(200).json(httpRespone.successRespone({ data: { location: user.location}}))
        }
        throw new HttpException(404, 'User notfound')
    }
})


router.post('/user', async (req, res, next) => {
    try {
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
        const { user, location } = req.body

        if (id) {
            if(user.location){
                const r_location = await Location.findOne({ id: user.location })
                console.log(r_location)
                if(!r_location){
                    await Location.insert(location)
                }
            }
            const result = await User.update({ id }, user);
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