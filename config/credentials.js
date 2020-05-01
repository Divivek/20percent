module.exports = {
  DBURL : process.env.DBURL_URI || process.env.DBURL || 'mongodb://localhost:27017/20percent',

  // twilio details
  TWI_APPID : process.env.TWI_APPID || null,
  TWI_SECRET : process.env.TWI_SECRET || null,

  // facebook details
  FB_APPID : process.env.FB_APPID || null,
  FB_CBURL : process.env.FB_CBURL || null,
  FB_FIELDS : process.env.FB_FIELDS || ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link'],
  FB_SECRET : process.env.FB_SECRET || null,

  // twitter details
  TW_APPID : process.env.TW_APPID || null,
  TW_CBURL : process.env.TW_CBURL || null,
  TW_SECRET : process.env.TW_SECRET || null,

  GH_APPID : process.env.GH_APPID || null,
  GH_CBURL : process.env.GH_CBURL || null, // 'http://localhost:8080/api/user/authViaGithub/callback',
  GH_SECRET : process.env.GH_SECRET || null,
  
// google details
  GOOGLE_CONSUMER_KEY : process.env.GOOGLE_CONSUMER_KEY || null,
  GOGGOLE_CBURL : process.env.GOGGOLE_CBURL || null, //'http://localhost:8080/api/user/authViaGoogle/callback',
//  FB_FIELDS : process.env.FB_FIELDS || ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link'],
  GOOGLE_CONSUMER_SECRET : process.env.GOOGLE_CONSUMER_SECRET || null,


    // fill in these values to center the map views in the app
  MAP_DEFAULT_CENTER_LATITUDE: process.env.MAP_DEFAULT_CENTER_LATITUDE || 37.7749,
  MAP_DEFAULT_CENTER_LONGITUDE: process.env.MAP_DEFAULT_CENTER_LONGITUDE || -122.4194
};
