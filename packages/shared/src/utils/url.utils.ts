export function handleNavigation(
  params: Array<{
    key: string;
    value: string;
  }>
) {
  const urlSearchParams = new URLSearchParams();

  params.forEach((param) => {
    urlSearchParams.append(param.key, param.value);
  });

  return urlSearchParams.toString();
}
