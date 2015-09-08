/**
 * Created by Bharath on 9/4/15.
 */

exports.updateanswers = function(req, res){

    sess = req.session;
    if(sess.username) {
        console.log('Session Exists');

        var answer1 = '';
        var answer2 = '';
        var answer3 = '';
        var storeResult = '';

        var temp = req.body.a1;

        var count = 0;
        var score = 0;

        if (temp) {
            answer1 = answer1 + '1a';
            count++;
        }

        temp = req.body.b1;

        if (temp) {
            answer1 = answer1 + '1b';
            count++
        }

        temp = req.body.c1;


        if (temp) {
            answer1 = answer1 + '1c';
            count++
        }

        temp = req.body.d1;


        if (temp) {
            answer1 = answer1 + '1d';
            count++
        }

        storeResult += answer1+'  ';
        if (answer1 == '1a') {
            answer1 = 'correct';
            score++;
        }
        else
            answer1 = 'incorrect';
        storeResult += answer1+'  ';

        temp = req.body.a2;


        if (temp) {
            answer2 = answer2 + '2a';
            count++
        }

        temp = req.body.b2;


        if (temp) {
            answer2 = answer2 + '2b';
            count++
        }

        temp = req.body.c2;


        if (temp) {
            answer2 = answer2 + '2c';
            count++
        }

        temp = req.body.d2;


        if (temp) {
            answer2 = answer2 + '2d';
            count++
        }


        storeResult+= answer2+' ';
        console.log('Answer 2 is '+answer2 );
        if (answer2 == '2d') {
            answer2 = 'correct';
            score++;
        }
        else{
            answer2 = 'incorrect';}
        console.log('Answer 2 is '+answer2 );

        storeResult+= answer2+' ';

        temp = req.body.a3;


        if (temp) {
            answer3 = answer3 + '3a';
            count++
        }

        temp = req.body.b3;

        if (temp) {
            answer3 = answer3 + '3b';
            count++
        }

        temp = req.body.c3;


        if (temp) {
            answer3 = answer3 + '3c';
            count++
        }

        temp = req.body.d3;


        if (temp) {
            answer3 = answer3 + '3d';
            count++
        }

        storeResult += answer3+'  ';
        if (answer3 == '3b') {
            answer3 = 'correct';
            score++;
        }
        else
            answer3 = 'incorrect';
        storeResult += answer3+'  ';

        storeResult+='---Score->'+score+'/3';


        console.log(answer1 + answer2 + answer3);
        console.log(storeResult);

        if (count < 3 || count > 3)
            res.render('resubmit');

        else {
            res.render('responsesuccess', {answer1: answer1, answer2: answer2, answer3: answer3, score: score});

            temp = '\'' + storeResult + '\'';
            var user = '\''+sess.username+'\'';
            console.log(temp);
            console.log(user);
            console.log('update table user_details set answers =' + temp + ' where uname =' + user);
            //Insert to database
            var mysql = require('mysql');
            var connection = mysql.createConnection({
                host: 'edissproject1.crbxasmdgbrq.us-east-1.rds.amazonaws.com',
                user: 'root',
                password: 'Pop123465.',
                database: 'Project1'
            });

            connection.connect(function (err) {
                if (!err) {
                    console.log("Database is connected ... \n\n");
                } else {
                    console.log("Error connecting database ... \n\n");
                }
            });

            connection.query('update user_details set answers =' + temp + ' where uname =' + user, function (err, rows, fields) {
                if (!err) {
                    console.log("Update Success");
                }
                else
                    console.log('Error while performing Update Query.');
            });

            connection.end();

        }

    }



}