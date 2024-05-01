const Picture = require("../models/PictureModel");
const fs = require("fs");


exports.teste = function (req, res, next) {
    if (req.file) next();
    req.session.save(() => res.redirect("index"));


}

exports.create = async (req, res) => {
    try {
        const { originalname } = req.file;
        const file = req.file;
        const _id = req.session.user._id;

        const picture = new Picture({
            originalname: originalname,
            src: file.path,
            _id: _id
        });

        await picture.save();
        const src = await Picture.findById(_id);
        await req.session.save(() => res.render("perfil", { src: src.src }));

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao salvar imagem" });
    }
}


exports.findAll = async (req, res, next) => {
    try {
        const pictures = await Picture.findById(req.session.user._id);
        req.pictures = pictures;
        next();
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar imagem" });
    }
}

exports.remove = async (req, res, next) => {
    try {
        const picture = await Picture.findByIdAndDelete(req.session.user._id);
        if (picture)
            fs.unlink(picture.src, (err) => { console.log("ELOUUUUU") });
        // await picture.remove();
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erro ao remover imagem" });
    }
}