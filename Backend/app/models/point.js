var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var pointSchema = new Schema({
            UserName :               { type : String, required : true},
            Email     :               { type : String },
            points : { type : Number, defaults : 0},
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete :                { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('point',pointSchema);
