module.exports = function (sequelize, dataTypes){

    let alias = "Product"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.STRING,
        },
        image: {
            type: dataTypes.STRING,
        },
        category_id: {
            type: dataTypes.INTEGER,
            references:{
                model: "Category",
                key: "id" 
            } 
        },
        material_id: {
            type: dataTypes.INTEGER,
            references:{
                model: "Material",
                key: "id" 
            } 
        },
        collection_id: {
            type: dataTypes.INTEGER,
            references:{
                model: "Collection",
                key: "id" 
            } 
        },
        precio: {
            type: dataTypes.INTEGER,
        }  

    };



    let config ={
        tableName: "products",
        timestamps: false
        
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate= function(models){
        Product.belongsTo(models.Category, {
            foreignKey: "category_id",
            as: "genero"}
        ),
        Product.belongsTo(models.Material, {
            foreignKey: "material_id",
            as: "material"}
        ),
        Product.belongsTo(models.Collection, {
            foreignKey: "collection_id",
            as: "coleccion"}
        )


    }
     

    return Product;
}