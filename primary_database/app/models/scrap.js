// const helper = require("../services/helper");

module.exports = function model(sequelize, DataTypes) {
  const scrap = sequelize.define(
    "scrap",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      link: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // token: {
      //   type: types.TEXT,
      //   defaultValue: "",
      // },
    },
    // {
    //   hooks: {
    //     beforeCreate: async (user) => {
    //       try {
    //         if (user.user_password) {
    //           user.user_password = await helper.hashPassword(
    //             user.user_password
    //           );
    //         }
    //       } catch (error) {
    //         console.log("\n save password hash error...", error);
    //       }
    //     },
    //     beforeUpdate: async (user) => {
    //       try {
    //         if (user.changed("user_password") && user.user_password) {
    //           user.user_password = await helper.hashPassword(
    //             user.user_password
    //           );
    //         }
    //       } catch (error) {
    //         console.log("\n update password hash error...", error);
    //       }
    //     },
    //   },
    // },
    {
      tableName: "scrap",
      timestamps: false,
    }
  );
  // Users.associate = function (models) {
  //   Users.hasMany(models.posts, {
  //     as: "posts",
  //     foreignKey: "userId",
  //     sourceKey: "uuid",
  //   });
  // };

  return scrap;
};
