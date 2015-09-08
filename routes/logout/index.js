/**
 * Created by Bharath on 9/5/15.
 */

exports.logoutuser = function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect('/');
        }
    });
};