const database=require("../Config/database");

async function checkIdPresent(uuid) {
    const conn=await database.getConnection();

    try{
        const [rows]=await conn.query('select exists(select 1 from w3Users where uuid=?) as userFound',[uuid]);
        return rows[0]?.userFound === 1; 
    }catch(err){
        console.log(err.message);
        throw new Error("Failed to check user.");
    }finally{
        conn.release();
    }
}

function awardPoints(){
    return Math.floor(1 + Math.random() * 10).toString();
}

async function cliamPoints(params) {
    const {uuid}=params;
    if(!uuid || isNaN(uuid)){
        throw new Error("Enter Valid Information.");
    }

    if(!(await checkIdPresent(uuid))){
        throw new Error("Invalid Id!");
    }

    const conn=await database.getConnection();

    try{
        const points=awardPoints();

        await conn.beginTransaction();

        await conn.query('INSERT INTO user_points (user_id, points) VALUES (?, ?)',[uuid, points]);

        await conn.commit();

        return {
            message: "Points claimed successfully!",
            awardedPoints: points,
        };
    }catch(err){
        await conn.rollback();
        throw new Error("Failed to claim points.");
    }finally{
        conn.release();
    }
}

async function addNewUser(params) {
    const {name} =params;
    if(!name){
        throw new Error("Enter name.");
    }
    const conn=await database.getConnection();

    try{
        await conn.beginTransaction();

        const [result]=await conn.query('INSERT INTO w3Users (name) VALUES (?)',[name]);

        await conn.commit();

        return result.insertId;
    }catch(err){
        await conn.rollback();
        throw new Error("Failed to add user.");
    }finally{
        conn.release();
    }
}

async function loadUsers() {
    const conn=await database.getConnection();

    try{
        const [result] =await conn.query('SELECT * FROM w3Users ORDER BY points DESC LIMIT 10');
        return result;
    }catch(err){
        throw new Error("Failed to load users.");
    }finally{
        conn.release();
    }
}

async function loadPointsHistory(params) {
    const {uuid}=params;
    console.log(uuid);
    if(!uuid || isNaN(uuid)){
        throw new Error("Enter Valid Information.");
    }

    if(!(await checkIdPresent(uuid))){
        throw new Error("Invalid Id!");
    }

    const conn=await database.getConnection();

    try{
        const [result] =await conn.query('SELECT * FROM user_points WHERE user_id = ? ORDER BY transaction_date DESC',[uuid]);
        return result;
    }catch(err){
        throw new Error("Failed to load history.");
    }finally{
        conn.release();
    }
}

async function loadUserInfo(params) {
    const {uuid}=params;

    if(!uuid || isNaN(uuid)){
        throw new Error("Enter Valid Information.");
    }

    if(!(await checkIdPresent(uuid))){
        throw new Error("Invalid Id!");
    }

    const conn=await database.getConnection();

    try{
        const [result] =await conn.query('SELECT * FROM w3Users where uuid=?',[uuid]);
        return result[0];
    }catch(err){
        throw new Error("Failed to load user info.");
    }finally{
        conn.release();
    }
}

module.exports={
    awardPoints,
    addNewUser,
    loadUsers,
    cliamPoints,
    loadPointsHistory,
    loadUserInfo,
}