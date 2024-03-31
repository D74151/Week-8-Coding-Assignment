
class Player {//create cless for player
    constructor(name, position, number) {//attributes needed for player
      this.name = name;
      this.position = position;
      this.number = number//create attributes for player
    }
  
    describe() {//function to describe player
      return `${this.name} plays ${this.position} wearing number ${this.number}`;
    }
  }
  
  class Team { //create team class
    constructor(name, city) {
      this.name = name;
      this.city = city
      this.players = []; // an array to hold players on team
    }

    addPlayer(player) { //add instance of player
      if (player instanceof Player) {
        this.players.push(player);
      } else {
        throw new Error(`You can only add an instance of Player. 
  argument is not a player: ${player}`);//does not fit Player criteria
      }
    }
  
    describe() {//function to describe team
      return `${this.name} has ${this.players.length} players on team.`;
    }
  }
  

  class Menu { //app menu class
    constructor() {
      this.teams = []; //an array for teams
      this.selectedTeam = null; //the currently selected team
    }
  

    start() { //method for entry of application
      let selection = this.showMainMenuOptions();
      while (selection != 0) {
        switch (selection) {
          case "1":
            this.createTeam();
            break;
          case "2":
            this.viewTeam();
            break;
          case "3":
            this.deleteTeam();
            break;
          case "4":
            this.displayTeams();
            break;
          default:
            selection = 0;
        }
        selection = this.showMainMenuOptions();
      }
      alert("Goodbye!");
    }
  
  
    showMainMenuOptions() { //main options user sees
      return prompt(`
  0) Exit
  1) Create a new Team
  2) View a Team
  3) Delete a Team
  4) Display all Teams
  `);
    }
  
   
    showTeamMenuOptions(teamInfo) {//options to display once inside of team option
      return prompt(`
  0) back
  1) add a new player
  2) delete a player
  -----------------
  ${teamInfo}
  `);
    }
  
  
    displayTeams() { //displays all teams entered into the app
      let teamString = "";
      for (let i = 0; i < this.teams.length; i++) {
        teamString += i + ") " + this.teams[i].name + "\n";
      }
      alert(teamString);
    }
  
    
    createTeam() { //creates new team
      let name = prompt("Enter name for new team: ");
      let city = prompt("Enter city where team plays: ")
      this.teams.push(new Team(name,city)); //pushes new team into array
    }
  
  
    viewTeam() { //method used to view team and players added
      
      let index = prompt("Enter the index of the team that you want to view:");
      if (index > -1 && index < this.teams.length) {
        this.selectedTeam = this.teams[index];
  
        let description = "Team Name: " + this.selectedTeam.name + "\n";
        description += " " + this.selectedTeam.describe() + "\n ";
  
        for (let i = 0; i < this.selectedTeam.players.length; i++) {
          description +=
            i + ") " + this.selectedTeam.players[i].describe() + "\n";
        }
        
        let selection1 = this.showTeamMenuOptions(description);
        switch (selection1) {
          case "1":
            this.createPlayer();
            break;
          case "2":
            this.deletePlayer();
        }
      }
    }
  
    
    deleteTeam() {
      let index = prompt("Enter the index of the team that you wish to delete: ");
      if (index > -1 && index < this.teams.length) {
        this.teams.splice(index, 1); //deletes team from team array
      }
    }
  

    createPlayer() {
      let name = prompt("Enter name for new player: ");
      let position = prompt("Enter position for new player: ");
      let number = prompt("Enter jersey number: ");
      this.selectedTeam.addPlayer(new Player(name, position, number)); //creates new player for selected team
    }
  

    deletePlayer() {
      let index = prompt(
        "Enter the index of the player that you wish to delete: "
      );
      if (index > -1 && index < this.selectedTeam.players.length) {
        this.selectedTeam.players.splice(index, 1); //deletes player from selected team
      }
    }
  }
  
  let menu = new Menu();
  menu.start();//initializes start of application