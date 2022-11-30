export const getNestedProperty = (object: any, propString: string) => {
  let value = object;

  const props = propString.split('.');
  for (let index = 0; index < props.length; index += 1) {
    if (props[index] === undefined) break;
    value = value[props[index]];
  }
  return value;
};
