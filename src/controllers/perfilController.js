
exports.index =  (req,res)=>{
    console.log(req.pictures);
    if (!req.pictures){
        const src = null;
        res.render('perfil',{src}); 
        return;
    }
    const src =  req.pictures.src;
    console.log(`http://localhost:3000/${src}`);
    res.render('perfil',{src}); 
    console.log(req.session.user);
};


