import { getConnectionObj } from "../config/DbConfig.js";

export function getTopData(req, res){
    try{
        const db = getConnectionObj();
        const q = `select * from cars where carid between 2 and 6;`
        db.query(q, (error, result)=>{
            if(error){
                res.status(500).send("Some Error occured");
            }
            else{
                if(result.length>0){
                    const senddata = {"data" : result};
                    //console.log(typeof JSON.stringify(senddata));
                    res.status(200).send(JSON.stringify(senddata));
                }
                else{
                    res.status(404).send("Data not found");
                }
            }
        });
    }
    catch(err){
        res.status(500).send("Some Error occured");
    }
}

export function getSearchCarids(req, res){
    try{
        const db = getConnectionObj();
        const city = req.params.city;
        const type = req.params.type;

        let q;

        if (type=="none"){
            q = `select carid from cars where city = '${city}' and booked = 0;`
        }else{
            q = `select carid from cars where city = '${city}' and type = '${type}' and booked = 0;`
        }

        db.query(q, (error, result)=>{
            if(error){
                //console.log("here1");
                res.status(500).send("Some Error occured");
            }
            else{
                if(result.length>0){
                    const senddata = {"data" : result};
                    //console.log(typeof JSON.stringify(senddata));
                    res.status(200).send(JSON.stringify(senddata));
                }
                else{
                    const senddata = {"data" : []};
                    res.status(404).send(senddata);
                }
            }
        });
    }
    catch(err){
        //console.log(err);
        res.status(500).send("Some Error occured");
    }
}

export function getSearchData(req, res){
    try{
        const db = getConnectionObj();
        const carids = req.body.data.map(ele=>ele.carid);
        const caridstr = carids.join(",");
        
        const q = `select * from cars where carid in (${caridstr});`;

        db.query(q, (error, result)=>{
            if(error){
                res.status(500).send("Some Error occured");
            }
            else{
                if(result.length>0){
                    const senddata = {"data" : result};
                    res.status(200).send(JSON.stringify(senddata));
                }
                else{
                    res.status(404).send("Data not found");
                }
            }
        });

    }
    catch(err){
        console.log(err);
        res.status(500).send("Some Error occured");
    }
}

export function changeBookedFlag(req, res){
    try{
        const db = getConnectionObj();
        const carid = parseInt(req.body.carid);
        let flag;
        if(req.body.flag === "true"){flag = 1;}
        else if(req.body.flag === "false"){flag = 0;}
        
        console.log(carid, flag);
        
        const q = `update cars set booked = ${flag} where carid = ${carid};`;

        db.query(q, (error, result)=>{
            if(error){
                console.log(error);
                res.status(500).send("Some Error occured");
            }
            else{
                res.status(200).send("Car Status updated successfully");
            }
        });

    }
    catch(err){
        console.log("here2")
        console.log(err);
        res.status(500).send("Some Error occured");
    }
}