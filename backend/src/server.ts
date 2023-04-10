import {App} from "./app";
import {AuthRoute} from "./routes/auth.route";
import {UserRoute} from "./routes/user.route";
import {PostRoute} from "./routes/post.route";

const app = new App([new AuthRoute(), new UserRoute(), new PostRoute()]);

app.listen();