export function generateId(length: number) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
  let id = "";

  for (let i = 0; i < length; ++i) {
    const index = Math.floor(Math.random() * characters.length);
    id += characters[index];
  }

  return id;
}