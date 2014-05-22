var auth = require("./auth/auth.js");
var admin_auth = require("./auth/admin_auth.js");

app.get("/", routes.public.index);
app.get("/themes", routes.public.theme);
app.get("/themes/:theme", routes.public.themechange);

app.get("/login", routes.sessions.view);
app.get("/logout", routes.sessions.destroy);
app.post("/login", routes.sessions.create);
app.get("/series/:id", routes.sessions.setseries);

// Admin Routes
app.get("/admin/dash", admin_auth, routes.admin.index);
app.get("/admin/series", admin_auth, routes.admin.series);

app.get("*", routes.public.redirect);