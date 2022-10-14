import dbConnect from "../../../utils/dbConnect";
import Create from "../../../mongodb/create"

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch(method) {
        case "GET":
        try {
            const creates = await Create.findById(id);

            if (!note) {
                return res.status(400).json({ success: false })
            }

            res.status(200).json({ success: true, data: creates });
        } catch (error) {
            res.status(400).json({ success: false });

        }
        break;
        case "PUT":
            try {
                const creates = await Create.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!note) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: creates });
            }  catch (error) {
                res.status(400).json({ success: false })
            }
            break;
            case "DELETE":
                try {
                    const deletedCreate = await Create.deleteOne({ _id: id });

                    if(!deletedCreate) {
                        return res.status(400).json({ success: false })
                    }

                    res.status(200).json({ success: true, data: {} })
                } catch (error) {
                    res.status(400).json({ success: false })
                }
                break;
                default:
                    res.status(400).json({ success: false })
                    break;
    }
}