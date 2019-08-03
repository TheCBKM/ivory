let shopauth=(req,res,next)=>{
    if(req.session.sid)
    next()
    else
    res.redirect('/shop/login');
}

let coustomerauth=(req,res,next)=>{
    if(req.session.cid)
    next()
    else
    res.redirect('/coustomer/login');
}

module.exports={
    shopauth,
    coustomerauth
}