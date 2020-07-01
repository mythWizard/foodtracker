# Unnamed Food Tracker

This is the backend to [https://github.com/mythWizard/foodtracker-frontend](https://github.com/mythWizard/foodtracker-frontend). 

The project as a whole is intended to focus heavily on visualization of users' entries. By breaking entries into a d3 hierarchy, users can view their calorie breakdown by meal and by macros.

This project was created as an exploration into modern web development using React and Redux. It is intended to be run on a standard MERN stack.

## Getting Started

Clone this repository and run `yarn install`. This will install all of the necessary libraries, however, you will need to set your own environment variables. I recommend creating a `.env` file and setting the variables `PORT` and `MONGO` to be the port you wish to run the server on and the address for your MongoDB respectively.

## Notes

- If you set `PORT` to anything other than 3001 and you plan to run the projects separately, you will need to change `proxy` in the frontend's `package.json`.
- This project is currently not hosted online anywhere.