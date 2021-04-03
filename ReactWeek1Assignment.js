class Student {
    constructor(name, email, community) {
        this.name = name
        this.email = email
        this.community = community
    }
}

class Bootcamp {
    constructor(name, level, student=[]) {
        this.name = name
        this.level = level
        this.student = student
    }
    registerStudent(student) {
            if (this.student.filter((eachStudent) => eachStudent.email === student.email).length > 0
            ) {
                console.log(`${student.email} is already registered for ${this.name}`);
            } else {
                this.student.push(student);
                console.log(`Registering ${student.email} to the bootcamp ${this.name}.`);
            }
        }
    }