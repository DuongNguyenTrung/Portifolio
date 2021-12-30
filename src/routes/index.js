import newsRouter from './location'
import userRouter from './user'
import authRouter from './auth'
function route(app){
    app.use('/travel',newsRouter)
    app.use('/user',userRouter)
    app.use('/',authRouter)
}
export default route;