import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("login", "routes/login.tsx"),
  route("admin", "routes/admin.tsx"), // Protected
  route(":slug", "routes/store.tsx"), // Public Store
] satisfies RouteConfig;
