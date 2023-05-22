# Application Title: A Description

This is repository for backend API data set up to connect Client side application called Habit Tracker.  

## Important Links

- [Client Repo](https://github.com/codessi/habit-tracker-project-client)
- [Deployed API](https://shrouded-plateau-44826.herokuapp.com)
- [Deployed Client](https://codessi.github.io/habit-tracker-project-client/)

## Planning Story

Mongo DB RESTful API was used to supply and save users' resources through connecting Client-side repository. The owner of resources can add, update, view the resource through authentication.  This repos was build in order of 
- test curl script and authentication
- build user routes
- build model 
- build application routes



### User Stories

- As a user I want to sign in/up
- As a user I want to Create a new habit list
- As a user I want to Read multiple habit records
- As a user I want to Read a single habit record
- As a user I want to Update a habit record I own
- As a user I want to Delete a habit record I own

### Technologies Used

- Express.js
- Mongo DB
- Mongoose 


### Unsolved Problems

- I would like to create more complex mongoose schema to support
  varity option of data, such as sub-habits, goal list etc. 


#### ERD:
![ERD](https://media.git.generalassemb.ly/user/31535/files/3b5c7500-1f28-11eb-9856-bfdeaf4a65c0) 