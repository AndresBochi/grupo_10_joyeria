module.exports = function (sequelize, dataTypes){

    let alias = "User"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
        },
        lastname: {
            type: dataTypes.STRING,
        },
        documento: {
            type: dataTypes.INTEGER,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true

        },
        password: {
            type: dataTypes.STRING,
        },
        avatar: {
            type: dataTypes.STRING,
        } 

    };

    let config ={
        tableName: "users",
        timestamps: false
        
    }

    let User = sequelize.define(alias, cols, config);

    return User;
}