function randomChart(){
    let xt=Math.floor(Math.random()*40)+1;
    let yt=Math.floor(Math.random()*40)+1;
    if(xt>=10&&xt<=12){
        yt+=Math.floor(Math.random()*50)+20;
    }
    const x=xt;
    const y=yt;

    return (x,y);
}

const randomArray=()=>Array(24).fill(null).reduce((acc, cur)=>{
    acc.push(randomChart());
    return acc;
},[]);

module.exports={randomArray};