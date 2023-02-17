const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

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
                    message: "Enter the name of the manager : ",
                    name: "managerName"
                },
                {
                    type: "input",
                    message: "Enter the manager's employee ID : ",
                    name: "managerId"
                },
                {
                    type: "input",
                    message: "Enter the manager's email address : ",
                    name: "managerEmail"
                },
                {
                    type: "input",
                    message: "Enter the manager's offcie number : ",
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

    //Function to create Engineer
    function createEngineer () {
        inquirer.prompt(
            [
                {
                    type: "input",
                    message: "Enter the name of the engineer : ",
                    name: "engineerName"
                },
                {
                    type: "input",
                    message: "Enter the engineer's employee ID : ",
                    name: "engineerId"
                },
                {
                    type: "input",
                    message: "Enter the engineer's email address : ",
                    name: "engineerEmail"
                },
                {
                    type: "input",
                    message: "Enter the engineer's GitHub : ",
                    name: "engineerGitHub"
                },
            ])
            .then (response => {
                const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGitHub);
                teamMembersArray.push(engineer);
                makeTeam();
            }
        );
    }

    //function to create intern
    function createIntern () {
        inquirer.prompt(
            [
                {
                    type: "input",
                    message: "Enter the name of the intern : ",
                    name: "internName"
                },
                {
                    type: "input",
                    message: "Enter the intern's employee ID :",
                    name: "internId"
                },
                {
                    type: "input",
                    message: "Enter the intern's email address : ",
                    name: "internEmail"
                },
                {
                    type: "input",
                    message: "Enter the school of the intern : ",
                    name: "internSchool"
                },
            ])
            .then (response => {
                const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
                teamMembersArray.push(intern);
                makeTeam();
            }
        );
    }

    //Generate HTML file 
    function buildHTML () {
        fs.writeFileSync('./output/team.html', generateHTML(teamMembersArray));
        console.log('The team HTML file has been generated inside the directory output');
    }
}
startApp();