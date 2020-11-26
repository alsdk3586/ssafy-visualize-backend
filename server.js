
const express=require('express');
const app=express();
const server=require('http').createServer(app); // 소켓을 사용하기 때문에 이렇게 변경한다. 
const PORT=8000;
const io=require('socket.io')(server)
const cors=require('cors');
const {sequelize, sensing1}=require('./models');
const { randomArray } = require('./utils/random');
const Sensing1 = require('./models/sensing1');
const { off } = require('process');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

sequelize.sync({force : false}) // true가 되면 데이터베이스가 날라간다 유이ㅢ하자 
.then(()=> console.log("db connect!!"))
.catch((err)=>console.log(err));

app.get("/",(req,res)=>{
    return res.json({connection:"this server is running"})
});

io.on("connection",function(socket){
    let offset=0;

    setInterval(async()=>{
        //socket.emit("chat",{ first:randomArray(),second:randomArray()});
        try{
            const dataLength=await Sensing1.findAndCountAll({
                attributes:[sequelize.fn("COUNT",sequelize.col("id"))]
            });
            //console.log(dataLength);
            const data=await Sensing1.findAll({
                limit:24,
                offset:offset
            });
            offset+=24;
            const array=data.reduce((acc,cur)=>{
                acc.push({time:cur.dataValues.time,num1:cur.dataValues.num1, num2:cur.dataValues.num2});
                return acc;
            },[]);
            socket.emit("chat",array);
            if(offset>dataLength.count-24){
                offset=0;
            }
            //console.log(array);
       }catch(err){
           console.log(err);
       }
    },1000);
    socket.on("chat",function(data){
        //console.log(`message form client : ${data}`);
    })
})




server.listen(PORT,()=>console.log(`this server listening on ${PORT}`));

