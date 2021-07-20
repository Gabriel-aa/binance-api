export const formatProps = (props: any) => {
  let formattedProps = "";

  for (const key in props) {
    const string = `${key}=${props[key]}`;
    formattedProps += formattedProps ? `&${string}` : `${string}`;
  }

  return formattedProps;
};
