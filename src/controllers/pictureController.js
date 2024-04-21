const Picture = require("../models/PictureModel");
const fs = require("fs");


exports.create = async (req, res) => {
    try {
        console.log(req.file);   
        console.log(req.session.user);                                                                           
        const { originalname } = req.file;
        console.log(originalname + "name");
        const file = req.file;
        const _id = req.session.user._id;

        const picture = new Picture({
            originalname : originalname,
            src: file.path,
            _id: _id
        });

        await picture.save();
        const src = await Picture.findById(_id);
        console.log(file.path);
        console.log(src.src);
        await req.session.save(() => res.render("perfil",{src: src.src}));

    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: "Erro ao salvar imagem" });
    }
}


exports.findAll = async (req, res,next) => {
    try {
        const pictures = await Picture.findById(req.session.user._id);
        console.log(pictures);
        req.pictures = pictures;
        next();
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar imagem" });
    }
}

exports.remove = async(req,res,next) => {
    try{
        const picture = await Picture.findByIdAndDelete(req.session.user._id);
        if(picture)
        fs.unlink(picture.src,(err)=>{console.log("ELOUUUUU")});
            // await picture.remove();
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Erro ao remover imagem" });
    }
}