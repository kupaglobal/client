export function ucFirst(str) {
    return !str ? '' : (str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1)).replace(/_/g, ' ');
}
  