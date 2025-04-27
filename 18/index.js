'use strict';

const company = {
    sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 600}],
    development: {
        web: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800}],
        internals: [{name: 'Jack', salary: 1300}]
    }
};

function getTotalSalary(department) {
    let totalSalary = 0;

    for (const subDepartment of Object.values(department)) {
       if (Array.isArray(subDepartment)) {
            subDepartment.forEach(employee => {
                totalSalary += employee.salary;
            });
        }
        else {
            totalSalary += getTotalSalary(subDepartment);
        }
    }

    return totalSalary;
}

console.log(getTotalSalary(company));