# thought-spot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



## Description
A web application that allows users to log thoughts, read others' thoughts and react to thoughts, as well as compile a group of friends. Currently only the back end is up and running using MonboDB as a databse.

    
![](/images/insomnia.png)
  


## Table of Contents

* [Installation](#installation)
* [Built With](#built-with)
* [Usage](#usage)
* [Questions](#questions)

## Installation
Clone the reposistory to your local machine and instal packages with 
`npm install	`
start the server with
`npm start`. 
    
## Usage
Currently can only retrieve and input data with a REST API client. Insomnia was used in the testing and development of the databse. To create a user, user the api/users POST request with a JSON body that includes "username" and "email" . To update, get one, or delete use the api/users/:userId endpoint with the PUT, GET, and DELETE methods respectively. To add a thought to the database, use the api/thoughts/:userId endpoint with a "thought" JSON body. To update, delete or get one thought, use the api/thoughts/:thoughtId endpoint with the PUT, DELETE and GET methods respectively. To add a friend or remove a friend, use the api/users/:userId/friends/:friendId (the friendId will be anohter user currently in the database) POST and DELETE requestS. To add a reaction to the database, use the api/thoughts/reactions/:thoughtId POST request with a "reactionText" body. To remove a reaction use api/thoughts/reactions/:thoughtId/:reactionId. 
[Example Walk Through Video](https://drive.google.com/file/d/1HoeLt5tPtpINQqCfJxi8MKII8G2BNR6e/view?usp=sharing)

  
## Built With

* NODE.JS
* INSOMNIA
* MONGOOSE
* EXPRESS.JS
* MONGODB
    
## Credits
Danielle Knapp and the University of Arizona

## Questions
Please direct any questions to dmknapp2385@gmail.com or visit my [GitHub](https://github.com/dmknapp2385) for more information. 

## License
This projects is protected under [MIT](license.txt).
