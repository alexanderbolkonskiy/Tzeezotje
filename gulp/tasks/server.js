export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}`
		},
		online: true,
		logLevel: "debug",
		notify: false,
		port: 3000,
	});
}