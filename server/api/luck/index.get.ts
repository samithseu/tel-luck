export default defineEventHandler(async () => {
  return await useStorage("assets:server").get("data.json");
});
