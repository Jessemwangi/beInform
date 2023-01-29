# Api documentation

## developer
this is the structure of the node api end point and how the file are organized
### File arrangement

#### api
>>> node backend connected to relational database mysql 8.0

controller/postController.js >>> the absraction layer that performs crud of Posts, the return json file __ DataAccess layer.

routes/posts.js >>> the API endpoints called by the client application, perfomr all client request (get, post,put,delete)

#### client 
>>> the folder with react app, this is the front end client application 

### End points