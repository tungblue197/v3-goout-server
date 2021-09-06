import { Router } from 'express';
import { Location } from '../entities/location';
import { Session } from '../entities/session';
import { User } from '../entities/user';
import httpRespone from '../helpers/httpRespone';
const router = Router();

router.get('/session', async (req, res, next) => {
    try {
        const result = await Session.find()
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})


router.get('/session/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if (id) {
            const result = await Session.findOne({ id },{ relations: ['locations', 'createdBy', 'winLocation']})
            if(result){
                return res.status(200).json(httpRespone.successRespone({ data: result }))

            }
        }
    } catch (error) {
        next(error)
    }


})

router.post('/session', async (req, res, next) => {
    try {
        const { session, locations } = req.body
        const user = await User.findOne({ id: session.createdBy })
        let _session = new Session();
        if (user) _session.createdBy = user;
        _session.id = session.id;
        _session.title = session.title;
        _session.content = session.content;
        _session.timeout = session.timeout;
        if (locations && locations.length) {
            locations.forEach((loc: Location) => {
                _session.addLocation(loc)
            })
        }
        console.log(_session);
        const sResult = await _session.save()
        return res.status(200).json(httpRespone.successRespone({ data: sResult }))
    } catch (error) {
        next(error)
    }

})


export default router;


