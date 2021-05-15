module.exports = (req, res, next) => {
    const { email, name, password, designation } = req.body;
    
    //checks if email is valid

    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    
    //checking for empty credentials in register and login 

    if (req.path === "/register") {
      //console.log(!email.length);
      if (![email, name, password,designation].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![email, password,designation].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  };
  