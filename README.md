QuaranTeams is an application that was built as a social network for users to share social distancing COVID-19 safe games. Users can friend other users, see other users' mutual friends, create games, post photos, and write reviews. Users can also "host" games, by scheduling a date and time and inviting either their friends or the general public to join. 

For a video demo, visit: https://www.youtube.com/watch?v=7fecELaLZXs

To Start

First, start the rails API: (Link to Backend Repo: https://github.com/grantkoji/GameNight83--backend)

In terminal:
cd GameNight83--backend
bundle
rails db:create
rails db:migrate
rails db:seed
rails s -p 3001

Next, follow these steps before running npm start in this front end:
cd gamenight83-client
npm install
npm start
