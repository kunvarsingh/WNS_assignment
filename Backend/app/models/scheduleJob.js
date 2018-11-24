var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var scheduleJobSchema = new Schema({
            name :               { type : String, required : true},
            price     :               { type : Number },
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete :                { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('scheduleJob',scheduleJobSchema);
