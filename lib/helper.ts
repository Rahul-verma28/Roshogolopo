export function formatText(value: string){
  if (!value) return value;
  
  let formatted = value;
  
  // Trim whitespace
  formatted = formatted.trim();
  
  // Capitalize first character (after other transformations)
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  return formatted;
}