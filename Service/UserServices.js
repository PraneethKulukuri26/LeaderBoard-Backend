const database=require("../Config/database");

function awardPoints(){
    return Math.floor(1 + Math.random() * 10).toString();
}

async function addNewUser(params) {
    const {name} =params;
    if(!name){
        throw new Error("Enter name.");
    }

    const conn=await database.getConnection();

    try{
        await conn.beginTransaction();

        const [result]=await conn.commit("INSERT INTO w3Users (name) VALUES (?)",[name]);

        await conn.commit();
        return result.insertId;
    }catch(err){
        await conn.rollback();
        throw new Error("Failed to add user.");
    }finally{
        conn.release();
    }
}

module.exports={
    awardPoints,
    addNewUser,
}