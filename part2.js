app.set('port', port);

app.listen(port, ()=> { // why do I need this?
    console.log("We are using port: " + port);
  });