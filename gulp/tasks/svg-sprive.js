import svgSprite from "gulp-svg-sprite";
export const svgSpriteTask = () => {
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: `icons.svg`,
					example: true,
					dest: '',
					prefix: '.icon-%s',
					dimensions: "%s"
				},	
			},shape: {
				dimension: {
				  maxWidth: 40,
				  maxHeight: 40
				},
			},
		}
		))
		.pipe(app.gulp.dest(`${app.path.build.images}`));
}