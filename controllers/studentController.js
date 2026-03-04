import Student from "../models/student.js"

export function createStudent(req, res) {

    if(req.user==null){
        res.status(403).json({
            message: "Unauthorized access. you need to loging before creating students"
        })
        return
    }

    if (!req.user.isAdmin) {
        res.json({
            message: "Only admins can create students"
        })
        return
    }

    const newStudent = new Student({
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    })

    newStudent.save().then(
        () => {
            res.json({
                message: "Student created successfully"
            })
        }
    )
}

export function getStudents(req, res) {

    Student.find().then(

        (students) => {
            res.json(students)
        })
}