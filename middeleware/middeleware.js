



exports.myMiddleware = (req, res, next) => {
    // Your middleware logic here
    console.log('Middleware executed');
    next(); // Call next() to pass control to the next middleware in the chain
  };
  
  




   




