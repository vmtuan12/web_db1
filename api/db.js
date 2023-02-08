import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Tuan$281203",
    database:"vcl1"
})