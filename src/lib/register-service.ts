/**
 * Register service.
 * @description Stores instances in `global` to prevent memory leaks in development.
 * @arg {string} name Service name.
 * @arg {function} initFn Function returning the service instance.
 * @return {*} Service instance.
 */
export const registerService = <T>(name: string, initFn: () => T): T => {
  if (process.env.NODE_ENV === "development") {
    if (!(name in global)) {
      // @ts-expect-error
      global[name] = initFn();
    }
    // @ts-expect-error
    return global[name];
  }
  return initFn();
};