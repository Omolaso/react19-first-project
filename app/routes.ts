import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/data-view", "./routes/dataView.tsx"),
] satisfies RouteConfig;
