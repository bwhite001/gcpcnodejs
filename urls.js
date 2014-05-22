var auth = require("./auth/auth.js");
var admin_auth = require("./auth/admin_auth.js");

app.get("/", routes.public.index);
app.get("/themes", routes.public.theme);
app.get("/themes/:theme", routes.public.themechange);


app.get("/login", routes.sessions.view);
app.get("/logout", routes.sessions.destroy);
app.post("/login", routes.sessions.create);
