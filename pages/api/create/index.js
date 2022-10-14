import dbConnect from '../../../utils/dbConnect';
import Create from '../../../mongodb/create';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const creates = await Create.find({});

                res.status(200).json({ success: true, data: creates })
            } catch (err) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const create = await Create.create(req.body);
                console.log(req.body);
                res.status(201).json({ success: true, data: create })
            } catch (err) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}   