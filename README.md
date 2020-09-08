QuaranTeams is an application that was built as a social network for users to share social distancing COVID-19 safe games. Users can friend other users, create games, post photos, and write reviews. Users can also "host" games, by scheduling a date and time and inviting either their friends or the general public to join. 

DraftProjector is an application that was built to assist a user with budgeting for a fantasy football auction draft. Users will also find team specific news related to their selected favorite team on the home page, after they've logged in. The default case will be NFL news.

To Start
Please follow the steps below to ensure the API's are on the proper ports.

First, start the rails API: (Link to Backend Repo: https://github.com/grantkoji/GameNight83--backend)

In terminal:
cd GameNight83--backend
bundle
rails db:create
rails db:migrate
rails db:seed
rails s -p 3001
Next, follow these steps before running npm start in this front end.

cd gamenight83-client
npm install
npm start