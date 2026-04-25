import { createRouter } from "@tanstack/react-router";
import { DefaultRouterError } from "@/components/DefaultRouterError";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultRouterError,
  });

  return router;
};
