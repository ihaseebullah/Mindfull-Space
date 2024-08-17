const jwt = require('jsonwebtoken');
const { User } = require('../Models/User');
async function amINew(req, res, next) {
    const token = req.cookies?.jwt;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
        if (err) {
            console.log(token)
            return res.status(403).json({ message: 'Unauthorized' });
        }
        try {

            const childUser = await User.findOne({ parentId: data.user._id });

            if (!childUser) {
                const createChild = new User({
                    username: `${data.user.username}`,
                    parentId: data.user._id,
                    miniAppName: 'Mindfull Space',
                });
                await createChild.save()
            }
            next();
        } catch (error) {
            console.error('Error in amINew middleware:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}

module.exports = amINew;
