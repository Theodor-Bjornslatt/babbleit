const { REDIS_PORT = 6379, REDIS_HOST = 'localhost' } = process.env

export const REDIS_OPTIONS = {
  port: REDIS_PORT as number,
  host: REDIS_HOST
}
