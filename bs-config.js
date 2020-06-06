
var _port= process.env.PORT || 8000;
module.exports = {

  port: _port,
  files: ['./**/*.{html,htm,css,js}'],
  server:{
      baseDir: "./dist/votechainxui"
  }
}
