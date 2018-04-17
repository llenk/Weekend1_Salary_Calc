$(document).ready(onReady);

function onReady() {
    $('#submitButt').on('click', addEmployee);
    $('#listOfEmployees').on('click', '.fire', fireEmployee);
}

//the function below adds the input to the employee array, adds them to the DOM, and updates the monthly costs
function addEmployee() {
    addEmployeeToArray();
    let index = arrayOfEmployees.length - 1; //index of last employee
    $('#listOfEmployees').append(arrayOfEmployees[index].tableString(index));
    updateMonthlyCosts();
}//end addEmployee

//the function below takes in the employee input and adds it to the employee array
//also clears input boxes
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
}//end addEmployeeToArray

//the function below manages the monthly costs updating
function updateMonthlyCosts() {
    let costs = calculateMonthlyCosts(); //costs here will be a number
    if (costs > 20000) {
        $('#costs').css('background', 'red');
    }
    else {
        $('#costs').css('background', 'white');
    }
    $('#costs').text('Total Monthly: $' + formatMoney(costs));
    
}//end updateMonthlyCosts

//the function below calculates the monthly costs
function calculateMonthlyCosts() {
    let yearlyCosts = 0;
    for (let i=0; i<arrayOfEmployees.length; i++) {
        yearlyCosts += arrayOfEmployees[i].salary;
    }
    let monthlyCosts = yearlyCosts / 12;
    monthlyCosts = convertToDollars(monthlyCosts);
    return monthlyCosts;
}//end calculateMonthlyCosts

// This function takes a number and truncates the decimals after 2
// It's for calculations, not displaying
function convertToDollars(amount) {
    amount *= 100;
    amount = Math.round(amount);
    amount /= 100;
    return amount; //amount here is a string

}//end convertToDollars

//the function below formats the monthly costs into dollar format with exactly two decimal places as a string
function formatMoney(amount) {
    //if the amount is zero, that's illegal, but the below code doesn't work either
    if (amount == 0) {
        return '0.00';
    }
    //this section adds the decimal places, if needed
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
    
    let formattedAmount = amount.slice(-3);
    amount = amount.slice(0, -3);
    //this section adds the commas
    while (amount.length > 3) {
        formattedAmount = ',' + amount.slice(-3) + formattedAmount;
        amount = amount.slice(0, -3);
    }
    formattedAmount = amount + formattedAmount;
    return formattedAmount; //amount here is a string
}//end formatMoney

function fireEmployee() {
    arrayOfEmployees.splice(this.id, 1);
    $('#listOfEmployees').html('');
    redoEmployeeTable();
}

function redoEmployeeTable() {
    for (let i=0; i<arrayOfEmployees.length; i++) {
        $('#listOfEmployees').append(arrayOfEmployees[i].tableString(i));
    }
    updateMonthlyCosts();
}

function randomLightGrayish() {
    let red = randomColorNumber();
    let green = randomColorNumber();
    let blue = randomColorNumber();
    let colorString = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    return colorString;
}

//generates random number in 196-204 or 218-226
function randomColorNumber() {
    let number = Math.floor(Math.random()*18); //random number 0-17
    if (number <= 8) {
        number += 196;
    }
    else {
        number += 209;
    }
    return number;
}

let arrayOfEmployees = [];

//class of an Employee object
class Employee {
    constructor(firstName, lastName, id, title, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.title = title;
        this.salary = Number(salary); 
        this.formattedSalary = formatMoney(this.salary);
    }
    tableString(i) {
        //the fire button has an id to help identifying which employee is being fired
        let color = 'rgb(211, 211, 211)';
        if (i%2 == 0) {
            color = randomLightGrayish();
        }
        let tableRow = '<tr style="background:' + color + '">'  + 
            '<td>' + this.firstName + '</td>' + 
            '<td>' + this.lastName + '</td>' + 
            '<td>' + this.id + '</td>' + 
            '<td>' + this.title + '</td>' + 
            '<td>' + this.formattedSalary + '</td>' + 
            '<td><button class="fire" id=' + i + '>Fire ' + this.firstName + '</button></td>' +
        '</tr>';
        return tableRow;
            
    }
}
