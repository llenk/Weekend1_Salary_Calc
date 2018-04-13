$(document).ready(onReady);

function onReady() {
    $('#submitButt').on('click', addEmployee);
}

function addEmployee() {
    addEmployeeToArray();
    $('#listOfEmployees').append(arrayOfEmployees[arrayOfEmployees.length-1].tableString());
    updateMonthlyCosts();
}

function addEmployeeToArray() {
    let firstName = $('#firstNameInput').val();
    $('#firstNameInput').val('');
    let lastName = $('#lastNameInput').val();
    $('#lastNameInput').val('');
    let id = $('#idInput').val();
    $('#idInput').val('');
    let title = $('#titleInput').val();
    $('#titleInput').val('');
    let salary = $('#salaryInput').val();
    $('#salaryInput').val('');
    arrayOfEmployees.push(new Employee(firstName, lastName, id, title, salary));
}

function updateMonthlyCosts() {
    let costs = calculateMonthlyCosts();
    console.log(costs);
}

function calculateMonthlyCosts() {
    let yearlyCosts = 0;
    for (let i=0; i<arrayOfEmployees.length; i++) {
        yearlyCosts += arrayOfEmployees[i].salary;
    }
    return yearlyCosts / 12;
}

let arrayOfEmployees = [];

class Employee {
    constructor(firstName, lastName, id, title, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.title = title;
        this.salary = Number(salary); 
    }
    tableString() {
        let tableRow = '<tr>'  + 
            '<td>' + this.firstName + '</td>' + 
            '<td>' + this.lastName + '</td>' + 
            '<td>' + this.id + '</td>' + 
            '<td>' + this.title + '</td>' + 
            '<td>' + this.salary + '</td>' + 
        '</tr>';
        return tableRow;
            
    }
}
