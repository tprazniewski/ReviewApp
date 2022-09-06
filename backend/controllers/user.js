const create = (req, res) => {
    console.log(req.body)
    res.send('<h1> Create User </h1>')

} 


module.exports = {
    create
}