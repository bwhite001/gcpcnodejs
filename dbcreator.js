var admin = require('./models/admin.js');
var award_type = require('./models/award_type.js');
var grade = require('./models/grade.js');
var shooter = require('./models/shooter.js');
var range_lane = require('./models/range_lane.js');
var booking = require('./models/booking.js');
var series = require('./models/series.js');
var score = require('./models/score.js');
var score_pistol = require('./models/score_pistol.js');
var match_type = require('./models/match_type.js');
var score_rifle = require('./models/score_rifle.js');

admin.sync({force:true});
award_type.sync({force:true});
grade.sync({force:true});
shooter.sync({force:true});
range_lane.sync({force:true});
booking.sync({force:true});
series.sync({force:true});
score.sync({force:true});
score_pistol.sync({force:true});
match_type.sync({force:true});
score_rifle.sync({force:true});

