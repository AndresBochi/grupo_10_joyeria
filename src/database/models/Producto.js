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

    return Product;
}