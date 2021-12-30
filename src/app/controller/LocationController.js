import location from '../models/Location'
import bcrypt from "bcrypt"
class LocationController {
 async showAll(req, res) {
try {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash('this is password !!!!!!', salt);
  console.log('ok');
  res.json(hashPassword)
} catch (error) {
  console.log(error);
}
    // location.find({},(err,docs)=>{
    //   if(!err){
    //      res.json(docs);
    //   }else {
    //     res.status(400).json('error')
    //   }
    // })
    
  }
  create(req, res) {
    const newlocation = new location({name:'Sapa',img:['0.JPG,1.JPG,2.JPG'],description:'Toẹt vời quá'});
    newlocation.save()
    // .then(()=>console.log('insert success !')).catch(()=>console.log('error !'))
    return res.json('Quyen Duong 259');
  }
}
export default new LocationController;