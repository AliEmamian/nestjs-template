const ip = process.env.IP ;
const port = process.env.PORT ;
const protocol = process.env.PROTOCOL ;
const nodeENV = process.env.NODE_ENV ;
const url =
  protocol +
  '://' +
  (process.env.URL ? process.env.URL : `${ip}:${port}`) +
  '/';

export const server = {
  ip,
  port,
  url,
  nodeENV,
};
