/**
 * Employee Inheritance System
 * 
 * This file implements a class hierarchy that demonstrates Object-Oriented
 * Programming principles in JavaScript including:
 * 1. Inheritance - using extends keyword
 * 2. Polymorphism - overriding methods in child classes
 * 3. Encapsulation - using private properties with underscore prefix
 */

// Base Employee class - parent class for all employee types
class Employee{

  constructor(name, age, address, salary, jobTitle){
    this._name = name;
    this._age = age;
    this._address = address;
    this._salary = salary;
    this._jobTitle = jobTitle;
    this._profileColor = 'profile-color-' + (Math.floor(Math.random() * 6) + 1);
    this._profileIcon = 'bi-person';
  }
  getEmployee(){
    return {
      name: this._name,
      age: this._age,
      address: this._address,
      salary: this._salary,
      jobTitle: this._jobTitle,
      profileColor: this._profileColor,
      profileIcon: this._profileIcon
    }
  }
  
  setProfileIcon(icon) {
    this._profileIcon = icon;
    return this._profileIcon;
  }
  
  setProfileColor(color) {
    this._profileColor = color;
    return this._profileColor;
  }

  calculateBonus(){
    return (this._salary * 0.5);
  }

  performanceTracker(){
    return ('Good Performance');
  }

  manageProjects(){
    return('Project here')
  }

}

/**
 * Manager Class
 * Extends Employee with specialized behavior for managers
 */
class Manager extends Employee{

  constructor(name, age, address, salary, jobTitle){
    super(name, age, address, salary, jobTitle);
    this._profileIcon = 'bi-briefcase';
  }

  calculateBonus(){
    return (this._salary * 0.7);
  }

  performanceTracker(){
    return ('Ok Performance');
  }

  manageProjects(){
    return('Good Day Mananger')
  }
}

/**
 * Developer Class
 * Extends Employee with specialized behavior for developers
 */
class Developer extends Employee{

  constructor(name, age, address, salary, jobTitle){
    super(name, age, address, salary, jobTitle);
    this._profileIcon = 'bi-code-square';
  }

  calculateBonus(){
    return (this._salary * 0.8);
  }

  performanceTracker(){
    return ('Meh Performance');
  }

  manageProjects(){
    return('Developing...')
  }
  
}

/**
 * Programmer Class
 * Extends Employee with specialized behavior for programmers
 */
class Programmer extends Employee{

  constructor(name, age, address, salary, jobTitle){
    super(name, age, address, salary, jobTitle);
    this._profileIcon = 'bi-terminal';
  }

  calculateBonus(){
    return (this._salary * 0.9);
  }

  performanceTracker(){
    return ('Krazy Performance');
  }

  manageProjects(){
    return('Fixing bugs...')
  }
  
}

// Function to generate random employee data for demo purposes
function getRandomName() {
  const firstNames = ["John", "Jane", "Michael", "Emma", "David", "Sarah", "Alex", "Olivia", "Daniel", "Sophia"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function getRandomAddress() {
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
  return `${Math.floor(Math.random() * 1000) + 1} Main St, ${cities[Math.floor(Math.random() * cities.length)]}`;
}

function getRandomJobTitle(type) {
  const managerTitles = ["Project Manager", "Department Manager", "Team Lead", "Director", "Chief Officer"];
  const developerTitles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI Developer", "Mobile Developer"];
  const programmerTitles = ["Software Engineer", "Systems Programmer", "Application Programmer", "Database Programmer", "Game Programmer"];
  
  switch(type) {
    case "Manager":
      return managerTitles[Math.floor(Math.random() * managerTitles.length)];
    case "Developer":
      return developerTitles[Math.floor(Math.random() * developerTitles.length)];
    case "Programmer":
      return programmerTitles[Math.floor(Math.random() * programmerTitles.length)];
  }
}

// Example usage
const manager = new Manager(getRandomName(), 25 + Math.floor(Math.random() * 20), getRandomAddress(), 80000 + Math.floor(Math.random() * 50000), getRandomJobTitle("Manager"));
const developer = new Developer(getRandomName(), 22 + Math.floor(Math.random() * 15), getRandomAddress(), 70000 + Math.floor(Math.random() * 60000), getRandomJobTitle("Developer"));
const programmer = new Programmer(getRandomName(), 20 + Math.floor(Math.random() * 25), getRandomAddress(), 75000 + Math.floor(Math.random() * 75000), getRandomJobTitle("Programmer"));

const employees = [manager, developer, programmer];

employees.forEach(emp => {
  console.log(emp.getEmployee());
  console.log("Bonus: ₱" + emp.calculateBonus());
  console.log(emp.performanceTracker());
  console.log(emp.manageProjects());
  console.log("---------------");
});