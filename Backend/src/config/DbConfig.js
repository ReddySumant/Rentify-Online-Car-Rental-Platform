import { createConnection } from 'mysql'

export function getConnectionObj(){
    const dbObj = {
        host : "localhost",
        user : "root",
        password: "",
        database: "rentify"
    };

    return createConnection(dbObj);
}

export function connectDatabase(){
    getConnectionObj().connect((err)=>{
        if(err){console.log("Connection with database failed");}
        else{
            console.log("Database Connected Successfully");
        }
    })
}