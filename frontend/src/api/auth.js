import client from './client'

export const createUser = async (userInfo) => {
    try {
        const {data} = await client.post('/user/create', userInfo)      
        return data  
    } catch (error) {
        return {error: error.message || error}
    }
}
export const verifyUseremail = async (userInfo) => {
    console.log('userInfoFrom auth.js:',userInfo)

    try {
        const {data} = await client.post('/user/verify-email', userInfo)      
        return data  
    } catch (error) {
        console.log(error.response?.data)
        return {error: error.message || error}
    }
}