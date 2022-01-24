import express from "express";
import fetch from "fetch";

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/authorize", (req, res) => {
  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: "b00bbdc9f75d487485f971e490654db6",
    client_secret: "c88a710a0c86484988b65b1594f18ef8",
    scope: "",
    redirect_uri: "http://localhost:3000/callback",
  })

  res.redirect("https://accounts.sporify.com/authorize?" + auth_query_parameters.toString())
});

app.get("/callback", (req, res) => {
  const code = req.query.code;

  var body = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code:"
  })

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: body,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: 
      "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
    }
  })

  async function getData(endpoint) {
    const response = await fetch("https://api.spotify.com/v1" + endpoint, {
      method: "get",
      headers: {
        Authorization: "Bearer " + global.access_token
      }
    })
  }

  const data = await response.json();
  global.access_token = data.access_token;

  res.redirect("/dashboard")
});


let listener = app.listen(3000, function () {
  console.log(
    "Your app is listening on http://localhost:" + listener.address().port
  );
});
