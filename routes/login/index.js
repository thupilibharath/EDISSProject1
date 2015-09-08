/**
 * Created by Bharath on 9/3/15.
 */

exports.loginsuccess = function(req, res){

    var uname1;
    var pwd1;
    var uname = req.body.username;
    console.log(uname);
    var temp = '\''+uname+'\'';
    var temprole ='\'normal\'';
    var pwd = req.body.password;
    console.log(pwd);
    sess = req.session;
    sess.username = uname;

    var size;
    // Connect to Database
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'Project1'
    });

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting database ... \n\n");
        }
    });


    connection.query('SELECT * from user_details where uname='+temp, function(err, rows) {
        if(rows.length==0)
            res.render('relogin');
        else if (!err&&rows.length>0) {
            console.log('The solution is: ', rows);
            uname1 = rows[0].uname;
            pwd1 = rows[0].pwd;
            var role = rows[0].role;

            if(uname1==uname&&pwd1==pwd&&role=='admin'&&sess.username) {// Admin user; fetch details of normal users


                connection.query('select * from user_details where role='+temprole, function(err, rows, fields) {
                    if(!err){

                        size = rows.length;
                        var content = [];
                        for(var i=0;i<size;i++){
                            var t1 = '';
                            t1 = t1+'USERNAME---';
                            t1 = t1+rows[i].uname;
                            t1 = t1+'\t\t';
                            t1 = t1+'---ANSWERS---';
                            t1 = t1+rows[i].answers;
                            content[i] = t1;
                        }
                        console.log(content);
                        res.render('admin', {result : content});

                    }

                    else{
                        console.log(err);
                        console.log('Error performing normal user query');
                    }

                });

            }

            else if(uname1==uname&&pwd1==pwd&&role=='normal'&&sess.username)
                res.render('quiz',{ name : 'Bharath', name1 : 'Thupili' });
            else
                res.render('relogin');
        }
        else
            console.log('Error while performing Query.');
    });


};
