export default url => {
  const ParamString = url.includes('?') ? url.split('?')[1].split('&'):[];
  const params = {};

  ParamString.forEach(param => {
    const paramSplit = param.split('=');
    params [ paramSplit[0]]= paramSplit[1];
  })
  return params;
}