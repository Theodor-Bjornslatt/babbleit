const {
  MONGO_USERNAME = 'God',
  MONGO_PASSWORD = 'password',
  MONGO_DATABASE = 'babbleit'
} = process.env

export const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(
  MONGO_PASSWORD
)}@babbleitcluster.gmgdd.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`
