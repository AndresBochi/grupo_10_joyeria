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
            type: dataTypes.INT,
            
        },
        material_id: {
            type: dataTypes.INT,
        },
        collection_id: {
            type: dataTypes.INT,
        },
        precio: {
            type: dataTypes.INT,
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
        )
    }
     
    Product.associate= function(models){
        Product.belongsTo(models.Material, {
            foreignKey: "material_id",
            as: "material"}
        )
    }
    
    Product.associate= function(models){
        Product.belongsTo(models.Collection, {
            foreignKey: "collection_id",
            as: "coleccion"}
        )
    }

    return Product;
}