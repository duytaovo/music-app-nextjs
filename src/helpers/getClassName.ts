const getClassName = (breakpoints: Array<Object>) => {
  const className =
    "grid " +
    breakpoints
      .map(
        (name) =>
          `${
            Object.keys(name)[0] === "xs" ? "" : `${Object.keys(name)[0]}:`
          }grid-cols-${Object.values(name)[0]}`,
      )
      .join(" ");
  return className;
};

export default getClassName;

