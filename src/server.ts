import app from "./app";

app.listen(process.env.PORT || 3333, (): void => {
  console.log(`APP running in 'http://localhost:${process.env.PORT}/'`);
});
