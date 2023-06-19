# Broken App Issues

-app.listen needed a function for callback
-changed every require at the top of the file to const instead of let and var. const does not allow variable to change
-added generic error handler
-added express.json() to tell express if the form data might return as JSON
-added a promise all to app.post, which works with multiple async promises. Returns all promises in single array