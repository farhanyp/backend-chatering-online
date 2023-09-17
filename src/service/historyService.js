import { Drink } from "../model/Drink.js";
import { Food } from "../model/Food.js";
import { RelationHistory } from "../model/RelationUserHistoryOrder.js";
import { User } from "../model/User.js"


const get = async (user) => {
    const UserFind = await User.findOne({ _id: user._id });

    if (UserFind) {
        const relationIds = UserFind.relations.map((history) => history);

        const histories = await RelationHistory.find({ _id: { $in: relationIds } })
        .populate({
            path: 'history',
            populate: [
              { path: 'foodId' },
              { path: 'drinkId' },
            ],
          })

        return histories;
    }
};


export default{
    get
}
