'use strict';

function Student(name, surname, birthYear, grades) {
    this.name = name;
    this.surname = surname;
    this.birthYear = birthYear;
    this.grades = grades;
    this.attendance = new Array(25).fill(null);
}

Student.prototype.getAge = function() {
    return new Date().getFullYear() - this.birthYear;
};

Student.prototype.getAverageGrade = function() {
    if (this.grades.length === 0) {
        return 0;
    }
    return (this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length).toFixed(1);
};

Student.prototype.present = function() {
    const index = this.attendance.indexOf(null);

    if (index !== -1) {
        this.attendance[index] = true;
    };
}

Student.prototype.absent = function() {
    const index = this.attendance.indexOf(null);

    if (index !== -1) {
        this.attendance[index] = false;
    }
};

Student.prototype.getAverageRate = function() {
    const attendedLessons = this.attendance.filter(val => val).length;
    const totalLessons = this.attendance.filter(val => val !== null).length;
    return totalLessons > 0 ? (attendedLessons / totalLessons).toFixed(1) : 0;
};

Student.prototype.summary = function() {
    const avgGrade = this.getAverageGrade();
    const avgRate = this.getAverageRate();

    if (avgGrade > 90 && avgRate > 0.9) {
        return "Молодець!";
    }
    
    if (avgGrade > 90 || avgRate > 0.9) {
        return "Добре, але можна краще";
    }

    return "Редиска!";
};

const student1 = new Student('John', 'Doe', 2000, [100, 90, 95, 92, 88]);
console.log(student1.name + ' ' + student1.surname);
console.log('Вік: ' + student1.getAge());
console.log('Середній бал: ' + student1.getAverageGrade());

student1.absent();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.absent();
student1.absent();
student1.present();

console.log('Середнє відвідування: ' + student1.getAverageRate());
console.log(student1.summary());

const student2 = new Student('Jane', 'Roe', 2002, [100, 95, 92, 99, 98]);
console.log(student2.name + ' ' + student2.surname);
console.log('Вік: ' + student2.getAge());
console.log('Середній бал: ' + student2.getAverageGrade());

student2.present();
student2.present();
student2.present();
student2.present();
student2.present();
student2.present();
student2.present();
student2.present();
student2.present();

console.log('Середнє відвідування: ' + student2.getAverageRate());
console.log(student2.summary());

const student3 = new Student('Sam', 'Lee', 1999, [77, 60, 88, 55, 45]);
console.log(student3.name + ' ' + student3.surname);
console.log('Вік: ' + student3.getAge());
console.log('Середній бал: ' + student3.getAverageGrade());

student3.absent();
student3.present();
student3.present();
student3.present();
student3.absent();
student3.absent();
student3.absent();
student3.absent();
student3.absent();

console.log('Середнє відвідування: ' + student3.getAverageRate());
console.log(student3.summary());