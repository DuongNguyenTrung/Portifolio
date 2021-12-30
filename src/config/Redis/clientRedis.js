import Redis from 'ioredis'

const client = new Redis('redis://:Duong2509@redis-19240.c280.us-central1-2.gce.cloud.redislabs.com:19240')
client.on('connect',()=>console.log('connected to Redis Server !'))
client.on('error',(err)=>console.log(err))

export default client