module.exports = (sequelize, DataTypes) => {
    const Citation = sequelize.define("Citation", {
        citeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        full_citation: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                notEmpty: true,
            },
        },
    });

    return Citation
};