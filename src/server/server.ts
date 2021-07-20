import app from "./index";
import router from "./router";

app.use(router);

app.listen(3000, () => {
  console.log("APP running at: http://localhost:3001");
});
