module.exports = {
  plugins: [
    require('postcss-svg')({
      dirs: ['images'],
    }),
    require('postcss-inline-comment')({}),
    require('postcss-inline-comment')({}),
    require('postcss-import')({}),
    require('precss')({}),
    require('autoprefixer')({}),
    require('postcss-discard-empty')({}),
    require('postcss-clean')({}),
  ],
};
