#Create our image from Node 9.2.0
FROM node:9.2.0
 
#Create a new directory to run our app.
RUN mkdir -p /usr/src/app
 
#Set the new directory as our working directory
WORKDIR /usr/src/app
 
#Copy all the content to the working directory
COPY . /usr/src/app
 
#install node packages to node_modules
RUN npm install
 
#Our app runs on port 8080. Expose it!
EXPOSE 8080
 
##Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --base-href ./
 
#Run the application.
CMD npm start
