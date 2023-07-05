module.exports = function (sequelize, dataTypes){

    let alias = "Material"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
        }

    };

    let config ={
        tableName: "materials",
        timestamps: false
        
    }

    let Material = sequelize.define(alias, cols, config);

    Material.associate= function(models){
        Material.hasMany(models.Product, {
            foreignKey: "material_id",
            as: "productos"}
        )
    }

    return Material;
}