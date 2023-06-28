const { Sequelize, Model } = require("sequelize")

const sequelize = new Sequelize("web_mobile", "root", null, {
    host: "localhost",
    dialect: "mysql"
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("Ket noi database thanh cong");
    } catch (e) {
        console.log("Loi ket noi database that bai : " + e);
    }
}
module.exports = connectDB
