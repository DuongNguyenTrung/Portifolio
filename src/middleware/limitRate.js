import client from "../config/Redis/clientRedis";

export default function limitRate(limit, expired) {
  return async (req, res, next) => {
    client.set("ip", 2509);
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const getkey = await client.get(ip);
    const ttl = await client.ttl(ip)
    console.log('count : ',getkey);
    console.log('expired : ',ttl);
    if (!getkey) {
      await client.setex(ip,expired*60 ,1);
      return next();
    }
    const count = await client.incr(ip)
    if(count<limit) return next()

    res.status(403).json({message:'Many request'+count});
  };
}
