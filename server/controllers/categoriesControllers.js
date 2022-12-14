const CategoriesSchema = require('../models/CategoriesModels')

async function getAllCategories(req,res){
    try {
        const data = await CategoriesSchema.find()
        res.status(200).json({
            data : JSON.stringify(data)
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

async function addCategories(req,res){
    try {
        const duplicate = await CategoriesSchema.find({title : req.body.title})
        if (duplicate.length === 1) {
            console.log(duplicate);
            throw new Error('Nama kategori sudah digunakan')
        }
        await CategoriesSchema.insertMany({
            title : req.body.title
        })
        res.status(201).json({
            msg : 'Kategori berhasil ditambahkan',
            msg1 : duplicate
        })
        return;
    } catch (error) {
        res.status(404).json({
            msg : error.message
        })
    }

}

async function editCategories(req,res){
    try {
        await CategoriesSchema.updateMany({
            _id : req.body.id
        },{
            $set: {
                title : req.body.title
            }
        })
        res.status(201).json({
            msg : "Berhasil"
        })
    } catch (error) {
        res.status(404).json({
            msg : "Tidak Ditemukan"
        })
    }
}

async function deleteCategories(req,res){
    const data = req.body.data.map(e => e.id)
    await CategoriesSchema.deleteMany({
        _id : data
    })
    res.json({
        msg : 'Kategori berhasil dihapus'
    })
}

module.exports = {getAllCategories,addCategories,editCategories,deleteCategories}