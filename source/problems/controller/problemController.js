const problemModel = require('../model/problemModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const validBody = function (body) {
    return Object.keys(body).length > 0
}

const problem = async function (req, res) {
    try {
        let data = req.body
        let { problemName, description, icons, displayName } = data
        if (!validBody(data)) {
            return res.status(400).send({ status: false, message: 'All field is required' })
        }
        if (!isValid(problemName))
            return res.status(400).send({ status: false, message: "Please enter problemName" })
        let allReadyExist = await problemModel.findOne({ problemName })
        if (allReadyExist) {
            return res.status(400).send("ProblemName allready exists")
        }
        if (description && !isValid(description))
            return res.status(400).send({ status: false, message: "Please enter description" })
        if (!isValid(icons))
            return res.status(400).send({ status: false, message: "Please enter icons" })
        if (displayName && !isValid(displayName))
            return res.status(400).send({ status: false, message: "Please enter displayName" })
        let obj = {
            problemName,
            description,
            icons,
            displayName
        }
        let created = await problemModel.create(obj)
        // console.log(created)
        return res.status(201).send({ message: "Created successfully" })


    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

const list = async function (req, res) {
    try {
        let listData = await problemModel.find().select({ _id: 0, __v: 0 })

        if (!listData) {
            return res.status(404).send({ status: false, message: "List data is empty" })
        }
        return res.status(200).send({ data: listData })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


module.exports = { problem, list }