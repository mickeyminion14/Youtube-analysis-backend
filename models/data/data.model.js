const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({

    random_forest: {
        type: Object
    },
    linear_regression: {
        type: Object
    },
    knn: {
        type: Object
    },
    kernal_svc: {
        type: Object
    },
    decision_tree: {
        type: Object
    }

}, {
    collection: "data",
    timestamps: true
});

const DataModel = mongoose.model("Todo", dataSchema);

module.exports = DataModel;