echo "Enter commit description"
read message
git add .
git commit -am"${message}"
echo "Pushing data to remote server!!!"
git push heroku master