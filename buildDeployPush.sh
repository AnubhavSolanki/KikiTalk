echo "Enter commit description"
read message
cd frontend
echo "Starting Building frontend"
npm run build
echo "Building Complete"
cd ../backend
sleep 2
echo "Deploying To Production"
git add .
git commit -am"${message}"
git push heroku master
echo "Successfully Deployed To Production"
cd ..
sleep 2
echo "Pushing to Github"
git add .
git commit -m"${message}"
git push 
echo "Successfully pushed to Github"

