const {zokou}=require("../framework/zokou")







zokou({nomCom:"restart",categorie:"Mods",reaction:"☔"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!superUser)
  {
    return repondre("hi This command is for owner");
  }

  const {exec}=require("child_process")

    repondre("TIMNASA-MD  bot Restarting ⏳");

  exec("pm2 restart all");
  

  



})
