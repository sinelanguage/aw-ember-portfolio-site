App = Ember.Application.create();

App.Utils = Ember.Object.create({

	convertToSlug: function(Text) {

		return Text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

	}

});

App.Router.map(function() {

	this.resource('dev');
	this.resource('work');
	this.resource('skills');
	this.resource('project', {
		path: '/work/:project_slug'
	});

});

/*, { path: '/:item_project'}*/



/*LiquidFire.map(function() {

	this.transition(

		this.fromRoute('index'),
		this.toRoute('skills'),
		this.use('toLeft'),
		this.reverse('toRight')

	);

	this.transition(

		this.fromRoute('index'),
		this.toRoute('work'),
		this.use('toLeft'),
		this.reverse('toRight')

	);

	this.transition(

		this.fromRoute('work'),
		this.toRoute('project'),
		this.use('toLeft'),
		this.reverse('toRight')

	);

});*/


App.IndexRoute = Ember.Route.extend({

	model: function() {

		return adam

	}

});

App.IndexView = Ember.View.extend({

	didInsertElement: function() {

		var el = ".homepage-flex-wrap";
		var spinner = window.spinner;

		if (spinner.style.opacity !== 1) {
			spinner.style.opacity = 1;
		}


		function checkIfLoaded() {

			if (!window.loaded) {

				setTimeout(function() {

					checkIfLoaded();
					clearTimeout();

				}, 16);

			} else {

				el = document.querySelector(el);

				reflowViewport(el);

				$(window).resize(function() {

					clearTimeout(a);
					var a = setTimeout(function() {
						reflowViewport(el)
					}, 750);

				});

				setTimeout(function() {

					el.style.opacity = 1;
					if (spinner.style.opacity !== 0) {
						spinner.style.opacity = 0;
					}
					// spinner.style.left = "25%";

				}, 1000);


			}

		};

		checkIfLoaded();

		function reflowViewport(el) {

			var vHeight, difference, elm;

			vHeight = window.innerHeight;
			difference = vHeight * 0.8;

			elm = el;
			elm.style.height = difference + 'px';

		};

	},

	willDestroyElement: function() {

		/*var spinner = ".spinn";
		spinner = document.querySelector(spinner);

		spinner.style.opacity = 1;*/
		// spinner.style.left = "75%";

	}

});

App.WorkView = Ember.View.extend({


	didInsertElement: function() {

		var el = ".work-flex-wrap";
		var spinner = window.spinner;

		if (spinner.style.opacity !== 1) {
			spinner.style.opacity = 1;
		}

		function checkIfLoaded() {

			if (!window.loaded) {

				setTimeout(function() {

					checkIfLoaded();
					clearTimeout();

				}, 16);

			} else {

				el = document.querySelector(el);

				setTimeout(function() {

					function preloadimages(arr) {

						var newimages = [],
							loadedimages = 0;

						var arr = (typeof arr != "object") ? [arr] : arr;

						function imageloadpost() {

							loadedimages++

							if (loadedimages == arr.length) {

								el.style.opacity = 1;
								if (spinner.style.opacity !== 0) {
									spinner.style.opacity = 0;
								}
								// spinner.style.top = "25%";

							}

						}

						for (var i = 0; i < arr.length; i++) {

							newimages[i] = new Image();
							newimages[i].src = arr[i];

							newimages[i].onload = function() {

								imageloadpost();

							};

							newimages[i].onerror = function() {

								imageloadpost();

							};
						}
					};

					preloadimages(["http://www.lorempixel.com/640/480/technics/1/", "http://www.lorempixel.com/640/480/technics/2/", "http://www.lorempixel.com/640/480/technics/3/", "http://www.lorempixel.com/640/480/technics/4/", "http://www.lorempixel.com/640/480/technics/5/"]);

				}, 1000);

			}

		};

		checkIfLoaded();

	},

	willDestroyElement: function() {

		/*var spinner = ".spinn";
		spinner = document.querySelector(spinner);

		spinner.style.opacity = 1;*/
		// spinner.style.top = "75%";

	}

});

App.SkillsView = Ember.View.extend({

	didInsertElement: function() {

		var el = ".skills-flex-wrap";
		var spinner = window.spinner;

		if (spinner.style.opacity !== 1) {
			spinner.style.opacity = 1;
		}


		function checkIfLoaded() {

			if (!window.loaded) {

				setTimeout(function() {

					checkIfLoaded();
					clearTimeout();

				}, 16);

			} else {

				el = document.querySelector(el);

				setTimeout(function() {

					el.style.opacity = 1;
					if (spinner.style.opacity !== 0) {
						spinner.style.opacity = 0;
					}
					// spinner.style.left = "25%";

				}, 1000);


			}

		};

		checkIfLoaded();

	}

});


App.DevRoute = Ember.Route.extend({

	model: function() {

		return adam

	}

});


App.WorkRoute = Ember.Route.extend({

	model: function() {

		return adam.work

	},

	afterModel: function(model) {

		model.forEach(function(work, idx) {

			newSlug = App.Utils.convertToSlug(work.projectName);

			var setterStr = idx + ".slug";
			model.set(setterStr, newSlug);

		});

	}

});

App.SkillsRoute = Ember.Route.extend({

	model: function() {

		return adam

	}

});

App.ProjectRoute = Ember.Route.extend({

	beforeModel: function() {

		adam.work.forEach(function(work, idx) {

			newSlug = App.Utils.convertToSlug(work.projectName);

			var setterStr = "work." + idx + ".slug";

			adam.set(setterStr, newSlug);

		});

	},

	model: function(params) {

		var project = adam.get('work').filter(function(obj) {

			return obj.slug === params.project_slug

		});

		return project[0]

	}
	/*,

	serialize: function(model, params) {

		return { project_slug: model.get('slug') };

	}*/

});


App.Adam = Ember.Object.extend({

	me: {

		name: "Adam Winick",
		description: "hybrid sr interactive designer / developer",
		intro: "I bring a unique hybrid of applying passion and strength to both Interactive Design and Front End Development. A designer and developer of creative technology.  I adopt a device and screen agnostic approach using a holistic combination of both design, and development. My approach is adaptive and performant.  My current stack focus is engaging advanced Javascript using MEAN stack: Angular/Node/Express/Mongo, Ionic, Famo.us, Velocity.js, GSAP, Phonegap/Cordova, Node/Express and Socket.io.",
		logoUrl: "assets/adamWinickLogo.svg",
		homePageLinks: ["dev/blog", "work", "skills"]

	},
	skillsTagline: "I make beautiful things on screens that people watch, point to, type on, or touch.",
	skillsIntro: "The development landscape changes from month to month as new technologies, frameworks and libraries are updated, or created.  This list of skills and familiarity with a particular development paradigm will be updated often to include new technologies that I have tested, and adopted into my toolset.  For now, the area where I am focusing my energies is continuing to master the more advanced and conceptual areas of JavaScript like how to compose a framwork.  I'm also currently obtaining certification in native iOS development using both Objective C and Swift.",
	skills: [{
		title: "Rapid 'any screen' prototyping for web and mobile front end build:",
		skillList: [
			"Bootstrap, Foundation, Material Design, Polymer, GSAP, Velocity, Famo.us, Node, Express, Socket io, Angular, Ionic",
			"Custom HTML5 + all related technologies (CSS3 with performance, power consumption, and GPU optimizations)",
			"Custom OO JS using vanilla, jQuery, Async libs, _lowdash, Angular, Ember, Backbone, Knockout, React, MEAN stack, Ionic",
			"Web Components using Polymer, Ember, React",
			"Mobile Specific: Ionic + Angular, Famo.us, xCode + Swift + Cocoa2d/3D, Android UI using Android IDE + Java + XML (I am currently working on mastering native iOS and Android development (not web, native applications: until then, I can use the native mobile libraries to build native UI prototypes).",
			"Wordpress customization and theming without plugins (native core WP + PHP)"
		]
	}, {
		title: "Front End UI/UX Technologies",
		skillList: [
			"HTML5 (DOM, BOM, APIs [cache, storage, history, audio, video])",
			"JavaScript using Doug Crockford enhancement, A Osamni patterns and frequently engage the authors of the most popular client side SPA frameworks. I'm currently working on Ember demos and updated documentation",
			"Async / AJAX or REST API's consumption, Promises, Modules (ES6, AMD, CommonJS, npm, bower, browserify)",
			"CSS3 enhanced (modernizr, html5shiv, preprocessors: LESS, SASS/Compass)",
			"Enhancements, interaction and animation using custom CSS3, HTML5, and JS.",
			"Custom HTML5 Canvas and WebGL, SVG animation",
			"I've integrated front end to the following back end or enterprise tech stacks: I've obtained a deep working understanding of these stacks and can interface beyond front end with back end programmers: PHP, .NET, J2EE or Oracle, Rails, MongoDB, Redis."
		]
	}, {
		title: "Mobile Hybrid Apps",
		skillList: [
			"Multi device HTML5 app development:",
			"Phonegap / Cordova",
			"Ionic",
			"Ember + Ember-Data + Liquid-Fire + Custom CSS3",
			"Custom performant HTML5/CSS3/JS mobile development for web apps",
			"Rich HTML5 media (audio, video, media streaming, and animations + any util APIs)",
			"Customized Canvas, HTML5 and CSS3 animation"
		]
	}, {
		title: "Javascript Frameworks Part 1:",
		info: "The following frameworks listed I have used extensively and deployed to production",
		skillList: [
			"Templating: Handlebars.js, Jade",
			"Single Page App: Angular.js, Ember.js, node.js (I've used Ember for a large app, and Angular for smaller less complex projects).",
			"Node + Express + Jade",
			"Realtime and/or streams using Node / Socket.io",
			"MEAN stack or MEEN stack (Ember or Angular)",
			"Single Page App (mobile specific): Ionic + Angular, Ember + EmData , PhoneGap/Cordova",
			"Utilities using Underscore, lowdash, or micro helper APIs like Async, Promise, VideoJS, anything I can consume really.",
			"Animations using: Velocity.js, GSAP, Famo.us or native JS + CSS3",
			"Native JS animations using rAf + CSS3 Matrix 2d/3d (strive for no jank)",
			"Tooling using Grunt and framework specific CLIs",
			"DI and modularity using Node/npm, Bower, Browserify, Require",
			"Data rendering using D3 and HighCharts",
			"BAAS using Heroku"
		]
	}, {
		title: "Javascript Frameworks Part 2:",
		info: "For the following frameworks listed, I have not used these in production. I only have self directed hacking or creative coding knowledge and experience. I achieved this through a combination of the JS community's patterns, framework/API docs and best practices. Mostly I used them to create basic CRUD, ToDoMVC or side projects. I have not had the chance to use these libraries or frameworks for client work as of yet. If you don't see it listed here, check further up in JS frameworks part 1 to see what I have used in production for client work.",
		skillList: [
			"ES6, PhantomJS, Ember Canary",
			"View or SPA libraries: Knockout, React, Flux, Backbone, HTML Bars",
			"Middle: Hapi, Restify, Sails",
			"Realtime: Meteor",
			"Animations using: Famo.us, Three.js, WebGL",
			"Tooling using Gulp, Yeoman, and framework specific CLIs",
			"BAAS using Firebase, PubNub, and Parse"
		]
	}],
	work: [{
			/*id: 1,*/
			slug: null,
			projectName: "2015 PanAm Games: by Chevrolet",
			client: "General Motors",
			agency: "Maclaren McCann",
			roll: "Front End Developer",
			technology: "HTML, CSS3, JavaScript, jQuery, XML, AJAX, Java + Struts",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		},

		{
			/*id: 2,*/
			slug: null,
			projectName: "GM Vehicle Comparison WebApp",
			client: "General Motors",
			agency: "Maclaren McCann",
			roll: "Fullstack Developer",
			technology: "HTML5, CSS3, Bootstrap, JavaScript, jQuery, XML, AJAX, Java + Struts, Ember.js",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		},

		{
			/*id: 3,*/
			slug: null,
			projectName: "Throwback Thursday",
			client: "Internal Project",
			agency: "Maclaren McCann",
			roll: "UI Designer, Fullstack Developer",
			technology: "HTMl5, CSS3, Javascript, Node, Express, Highcharts.js",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		},

		{
			/*id: 4,*/
			slug: null,
			projectName: "GM Mobile Preferred Pricing Microsite",
			client: "General Motors",
			agency: "Maclaren McCann",
			roll: "Front End Developer",
			technology: "HTML, CSS3, JavaScript, jQuery, XML, AJAX, Java + Struts",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		},

		{
			/*id: 5,*/
			slug: null,
			projectName: "General Motors 2014 Owners Center",
			client: "General Motors",
			agency: "Maclaren McCann",
			roll: "Front End Developer",
			technology: "HTML, CSS, JavaScript, jQuery, XML, AJAX, Java + Struts",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		},

		{
			/*id: 6,*/
			slug: null,
			projectName: "Jobliss: WebApp: UI development",
			client: "http://www.gojobbliss.com/",
			agency: "Lush Concepts",
			roll: "UI Design and Front End Development for user logged in view/state: Calendar and Scheduling UI",
			technology: "Bootstrap, FullCalendar.js, JavaScript, jQuery, Rails",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		},

		{
			/*id: 7,*/
			slug: null,
			projectName: "Manage Your Gambling Urges: iOS App",
			client: "CAMH",
			agency: "Lush Concepts",
			roll: "UI Designer",
			technology: "Obj C, Cocoa 2d, Sketch",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		},

		{
			/*id: 8,*/
			slug: null,
			projectName: "Break It Off: iOS/Android App",
			client: "Canadian Cancer Society",
			agency: "Lush Concepts",
			roll: "UI Designer",
			technology: "HTML5, CSS3, JavaScript, jQuery Mobile, PhoneGap/Cordova",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		},

		{
			/*id: 9,*/
			slug: null,
			projectName: "Earl's Restaurants Responsive Joomla Template and Integration",
			client: "Earl's Restaurants",
			agency: "Leo Burnett",
			roll: "Front End Developer",
			technology: "HTML5, CSS3, Bootstrap, JavaScript, jQuery, Joomla, PHP/MySQL",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		},

		{
			/*id: 10,*/
			slug: null,
			projectName: "Redvault: Visual Asset Management WebApp",
			client: "Internal Project",
			agency: "Ogilvy",
			roll: "Fullstack Developer, UI Designer, UI Developer, Technical Architecture",
			technology: "HTML5, CSS3, Bootstrap, JavaScript, jQuery, Ember.js",
			description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy.  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy",
			thumbnail: "Thumbnail Image",
			images: ["Project Image"]
		}
	]

});

var adam = App.Adam.create();