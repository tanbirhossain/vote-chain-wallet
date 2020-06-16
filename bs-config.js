
var _port= process.env.PORT || 8000;
module.exports = {
  "injectChanges" : true,
  port: _port,
  files: ['./dist/votechainxui/**/*.{html,htm,css,js,ts}','.html'],
  server:{
      baseDir: "./dist/votechainxui"
  }
}
