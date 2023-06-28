import db from '../models/index'
import { createNewUser, getAllNguoiDung, getUserById, updateUser, deleteUser } from '../services/CRUD.service';
import bcrypt from "bcryptjs"
const express = require('express')

const salt = bcrypt.genSaltSync(10)

const getHomePage = async (req, res) => {
    try {
        const data = await db.phan_quyen.findAll()

        // const data = await db.nguoiDung.findAll()

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }
    catch (e) {
        console.log(e);
    }
}

// const getAboutPage = (req, res) => {
//     return res.render('test/about.ejs');
// }

// const getCrud = (req, res) => {
//     return res.render('test/crud.ejs')
// }

// const postCrud = async (req, res) => {
//     const message = await createNewUser(req.body)
//     // console.log(message);
//     return res.send('hello my dang ki')
// }

// const getNguoiDung = async (req, res) => {
//     const data = await getAllNguoiDung()
//     // console.log("--------------------");
//     // console.log(data);
//     // console.log('-------------------------');
//     // return res.render('test/getNguoidung', {
//     //     dataTable: data
//     // })
//     return res.send(data)

// }

// const getEditNguoiDung = async (req, res) => {

//     let idNguoiDung = req.query.id
//     if (idNguoiDung) {
//         let userData = await getUserById(idNguoiDung)
//         // console.log(userData);
//         return res.render("test/editNguoiDung", {
//             userData: userData
//         })
//     }
//     else {
//         return res.send('id not found')
//     }

// }

const editNguoiDung = async (req, res) => {
    let data = req.body;
    // await updateUser(data)
    return res.send('done')
}

// const deleteNguoiDung = async (req, res) => {
//     let idUser = req.query.id;
//     if (idUser) {
//         await deleteUser(idUser)
//         return res.send('Delete user is succeed')
//     } else {
//         return res.send('not found')
//     }

// }



export { getHomePage, editNguoiDung }
// getCrud, postCrud, getNguoiDung, getEditNguoiDung, , deleteNguoiDung getAboutPage