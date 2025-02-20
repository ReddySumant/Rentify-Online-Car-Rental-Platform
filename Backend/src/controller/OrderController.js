import { getConnectionObj } from "../config/DbConfig.js";


export function addOrderData(req, res) {
    try {
        const db = getConnectionObj();
        let data = req.body;
        console.log(data);

        let q = `insert into orders 
                values(1, ${data.carid}, '${data.carname}', '${data.model}', '${data.startdate}', 
                '${data.enddate}', '${data.email}', '${data.name}', ${data.age}, ${data.contact},'${data.city}', ${data.amount});`;

        db.query(q, (error, result)=>{
            if(error){
                console.log(error);
                res.status(500).send("Some Error Occured");
            }
            else{
                res.status(200).send("Data Added Successfully");
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Some Error Occured");
    }
}

export function getOrderData(req, res) {
    try {
        const db = getConnectionObj();

        let q = `select * from orders where empid = 1`;

        db.query(q, (error, result)=>{
            if(error){
                console.log(error);
                res.status(500).send("Some Error Occured");
            }
            else{
                const data = {"data" : result};
                res.status(200).send(JSON.stringify(data));
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Some Error Occured");
    }
}

export function deleteOrderData(req, res) {
    try {
        const db = getConnectionObj();
        const data = req.body;

        let q = `delete from orders where carid = ${data.carid};`;

        db.query(q, (error, result)=>{
            if(error){
                console.log(error);
                res.status(500).send("Some Error Occured");
            }
            else{
                const data = {"data" : result};
                res.status(200).send("Order Removed Succesfully");
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Some Error Occured");
    }
}