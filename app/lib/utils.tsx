export function capitalize(string: string) {
  return string[0].toUpperCase() + string.substring(1);
}

export function formatDate(dateString: string | undefined) {
  if (!dateString) return;

  return dateString.includes("T0") ? dateString.split("T0")[0] : dateString;
}
