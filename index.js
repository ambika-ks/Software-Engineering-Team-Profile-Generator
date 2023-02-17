const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.


//Array for team members
teamMembersArray = [];

//Start
function startApp(){
    createManager();

    //Adding Team Members
    function makeTeam()
    {
        inquirer.prompt([
            
            {
                type: "list",
                message: "Enter Team Member Positions",
                name: "addTeamMember",
                choices: ["Engineer", "Intern", "No more Team Member"]

            }]) .then(function (res) {
                switch (res.addTeamMember) {
                    case "Engineer":
                        createEngineer();
                        break;
                    case "Intern":
                        createIntern();
                        break;
                    default:
                        buildHTML();
                }
            });       
    }

    // Function to create Manager
    function createManager () {
        inquirer.prompt(
            [
                {
                    type: "input",
                    message: "What is the name of the manager?",
                    name: "managerName"
                },
                {
                    type: "input",
                    message: "What is the manager's employee ID?",
                    name: "managerId"
                },
                {
                    type: "input",
                    message: "What is the manager's email address?",
                    name: "managerEmail"
                },
                {
                    type: "input",
                    message: "What is the manager's offcie number?",
                    name: "managerOffice"
                },
            ])
            .then (response => {
                const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOffice);
                teamMembersArray.push(manager);
                makeTeam();
            }
        );
    }





















}