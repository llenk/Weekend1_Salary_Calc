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
    let costs = calculateMonthlyCosts(); //costs here will be a number
    if (costs > 20000) {
        $('#costs').css('background', 'red');
    }
    $('#costs').text('Total Monthly: $' + addDecimals(costs)); //addDecimals(costs) here will be a string
    console.log(addDecimals(costs));
    
}

function calculateMonthlyCosts() {
    let yearlyCosts = 0;
    for (let i=0; i<arrayOfEmployees.length; i++) {
        yearlyCosts += arrayOfEmployees[i].salary;
    }
    let monthlyCosts = yearlyCosts / 12;
    monthlyCosts = convertToDollars(monthlyCosts);
    return monthlyCosts;
}

// This function takes a number and converts is to dollar format (truncating decimals or adding zeros as needed).
// It does not add a dollar sign.
function convertToDollars(amount) {
    amount *= 100;
    amount = Math.round(amount);
    amount /= 100;
    return amount; //amount here is a string

}

function addDecimals(amount) {
    amount *= 100;
    let decimals = ''; //these are the string of decimals that have to be appended for accurate display (4000 should display as 4000.00)
    amount = Math.round(amount);
    if (amount.toString().substr(-2, 2) == '00') {
        decimals = '.00';
    }
    else if (amount.toString().substr(-1, 1) == '0') {
        decimals = '0';
    }
    amount /= 100;
    amount = amount.toString() + decimals;
    return amount; //amount here is a string
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
