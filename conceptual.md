### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Through Async Callbacks, promises and async/await. 
- What is a Promise?
A promise is an object in javascript and returns a promise or guarantee that a value will be returned
- What are the differences between an async function and a regular function?
Async always returns a promise
- What is the difference between Node.js and Express.js?
Node is a javascript environment and express is on top of node, working as a framework for Node.
- What is the error-first callback pattern?
It's part of Node.js callbacks. The callback's functions first parameter is listed as an error. Node
will then supply an error object.
- What is middleware?
A code that runs in the middle of the request/response cycle. Express.json(), 404, and global errors are examples
- What does the `next` function do?
next returns the next route and moves the function forward in express. If an argument is passed to next, then Express will treat it as an error. 
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
