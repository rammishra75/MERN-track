const ageFilter = ((req, res, next) =>{
    const age = req.query.age;
    if(age <= 18){
        res.send("You are not allowed to access this page due to underage");
        res.end();
    }else if(age > 18 && age <= 25){
        res.send("You are allowed to access this page but with some restrictions");
        next();
    }
    else {
        res.send("You are overage to access this page");
        res.end();
    }
    
})

module.exports = ageFilter;