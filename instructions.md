# My-API-Template
The most popular framework to build Restful APIs in Node.js is **Express**
```sh
# Updating npm
sudo npm install -g npm

# Starting a new node project
npm init -y
```

This will create a *package.json*
It gives us a context for installing packages that we can use in Node.js like Express

```sh
# Install Express
npm install express
```

This will add **Express** to our dependencies in the *package.json* file
From there, we need a file to write our code in

```sh
# Creating an index.js file
touch index.js
```

On index.js
```sh
# Declaring a variable for app that represents the actual API we're building
const app = require('express')();
# It's value is an import of the express package
const PORT = 8080;

# Firing our API on the server
app.listen(
	PORT,
	() => console.log(`It's alive on http://localhost:${PORT}`)
)
```

**app.listen()** tells to listen on an specific port which we define as its own separate variable as 8080

Now we can **run our API** typing
```sh
node .
```


### Accessing our API
Debugging our API in the browser is not the best option
There are many different way to access our API
```sh
curl http://localhost:8080
```

We could install VS Code extension *REST Client*

Or we could use a **REST Client** like **Insomnia** or **Postman**


### Accesing our API with Imsonia
We'll use https://insomnia.rest/
Insomnia provides a nice way to format our request
It also provides a history of all our interactions

On index.js we'll add and endpoint to the API
This will automatically set up our server with that endpoint *http://localhost:8080/tshirt*

```sh
app.get('/tshirt');
```

Now we need oto handle a request to it
The request is the incoming data while the response is the data we want to send back to the client

```sh
# Handler, run this function when the route is requested
app.get('/tshirt', (req, res) => {

	# OK response
	res.status(200).send({ 
		tshirt: 'red',
		size: 'large'
	})
});
```

Now we can send a data payload along with it
If we pass a JavaScript object as the argument, it will be send that data back as JSON by default

After saving the file and restarting the server
Now we can make a get request from insomnia to *localhost/8080/tshirt*
And we get a JSON object back as the response body with a status code of 200

Now we'll add a second endpoint
When dealing with a post request, it means that the user is trying to create new data on the server
```sh
# Adding a dynamic url parameter that represents the id of the tshirt
app.post('/tshirt/:id', (req, res) => {
	
	# We can get the id from the URL, its value is made available to us on the request parameters object
	const { id } = req.params;

	# The logo is containted in the request body, which is a custom data payload contained in the incoming request
	const { logo } = req.body;

	# Making sure if we have a logo in the request body
	if (!logo) {

		# If not, we'll send an error response with a 418 status code and an error message
		res.status(418).send({ message: 'We need a logo!'})
	}

	# But assuming we do have a logo, we can send a reponse with a tshirt that contains that logo and id
	res.send({
		tshirt: `red with your ${logo} and ID of ${id}`,
	});
})
```

The request object in express allows us to access information from the request message like the url parameters, the body, the headers, etc
With that info, we could use it to save a new record to the database or something similar


### Parsing JSON
After that, we can send that request and see that we receive an **500 error response**
The error apperas because we can't destructure the property logo from the request body

The reason for that, is that *Express doesn't parse JSON in the body by default*
Because not everybody uses Express to build a JSON API, this is why it's not the default behavior

We need to set up middleware that tells Express to parse json before the actual data hits the function that we're using to handle the request
- Request
- Middleware (Parse JSON Here)
- Response

**Middleware** is a shared code that runs before every endpoint callback that we define
```sh
const express = require('express');
const app = express();
const PORT = 8080

# Now every request that comes in will first go to through this express json middleware which will convert the body to JSON
# Therefore, making it available in our post callback
app.use( express.json() );

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'red',
        size: 'large'
    });
});

app.post('/tshirt/:id'), (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if(!logo) {
        res.status(418).send({ message: 'We need a logo!'})
    }

    res.send({
        tshirt: `red with your ${logo} and ID of ${id}`,
    });

};
```

After saving and restart the server, we can send the same request and see that we get back a successful response
And if we make a logo an empty string, it will return a 418 response with a message that we need a logo

Done!