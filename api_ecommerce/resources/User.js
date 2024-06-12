export default {
    user_list: (user)=>{
        return{
            _id:user.id,
            name: user.name,
            subname: user.subname,
            email: user.email,
            avatar: user.avatar,

        }
    }
}