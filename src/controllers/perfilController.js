
exports.index = (req, res) => {
    console.log(req.pictures);
    let src = null;
    if (req.pictures)
        src = req.pictures.src;

    res.render('perfil', { src });
};

exports.indexEdit = (req, res) => {
    let src = null;
    if (req.pictures)
        src = req.pictures.src;

    res.render('perfilEdit', { src });
};



