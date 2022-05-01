echo "Enter commit description"
read message
cd frontend
echo "Starting Building frontend"
npm run build
echo "Building Complete"
cd ../backend
echo "Deploying To Production"
git add .
git commit -am"${message}"
git push heroku master
echo "Successfully Deployed To Production"
cd ..
echo "Pushing to Github"
git add .
git commit -m"${message}"
git push 
echo "Successfully pushed to Github"

