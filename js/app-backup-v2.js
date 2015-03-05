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



LiquidFire.map(function() {

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

});


App.IndexRoute = Ember.Route.extend({

	model: function() {

		return adam

	}

});


App.IndexView = Ember.View.extend({

	didInsertElement: function() {

		var wrapper = ".homepage-flex-wrap";

		return preloader.preloaderHome(wrapper);

		}

});

App.WorkView = Ember.View.extend({


	// redo all this shit, its getting too fuckin messy
	wrapper: ".work-flex-wrap",
	elToDestroy: ".homepage-flex-wrap",

	didInsertElement: function() {

		var wrapper = this.get('wrapper');
		var elToDestroy = this.get('elToDestroy');

		return preloader.preloaderAnim(wrapper);

	},

	willDestroyElement: function() {

		var wrapper = this.get('wrapper');
		var elToDestroy = this.get('elToDestroy');

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

App.PreloaderAnimation = Ember.Object.extend({

	// redo all this shit, you need to have one that makes opacity 1, and one that returns it back to zero on destroy.

	loadedFadeIn: function(el) {

		var elm = el;
		elm.style.opacity = 1;

	},

	onDestroyFadeOut: function(el) {
		
		var elm = document.querySelector(el);
		elm.style.opacity = 0;

	},

	repositionEls: function(el) {

		var vHeight, difference, elm;

		vHeight = window.innerHeight;
		difference = vHeight * 0.8;

		elm = el;
		elm.style.height = difference + 'px';

	},

	reflowFlexViewport: function(el) {

		var a, elm;
		elm = el;

		return $(window).resize(function() {

				clearTimeout(a);
				a = setTimeout(function() { preloader.repositionEls(elm); }, 750);

			});
	},

	preloaderAnim: function(wrapper) {

		var wrapper = wrapper;

		return (function(){

			el = document.querySelector(wrapper);

			preloader.loadedFadeIn(el);

		})();
	},

	preloaderHome: function(wrapper) {

		var wrapper = wrapper;

		return $(window).load(function(){

			el = document.querySelector(wrapper);

			preloader.loadedFadeIn(el);
			preloader.repositionEls(el);
		    preloader.reflowFlexViewport(el);

		});
	}

});

var preloader = App.PreloaderAnimation.create();


App.Adam = Ember.Object.extend({

	me: {

		name: "Adam Winick",
		description: "hybrid sr interactive designer / developer",
		intro: "I bring a unique hybrid of applying passion and strength to both Interactive Design and Front End Development. A designer and developer of creative technology.  I adopt a device and screen agnostic approach using a holistic combination of both design, and development. My approach is adaptive and performant.  My current stack focus is engaging advanced Javascript using MEAN stack: Angular/Node/Express/Mongo, Ionic, Famo.us, Velocity.js, GSAP, Phonegap/Cordova, Node/Express and Socket.io.",
		logoUrl: "assets/adamWinickLogo.svg",
		homePageLinks: ["dev/blog", "work", "skills"]

	},
	skills: [{
		title: "Web/WebApp/SPA/Mobile/Touch User Interface Engineering: Design and Front End Development",
		skillList: [
			"Adaptive and/or responsive prototyping / MVP for any device / screen size",
			"Fullstack and front end UI and WebApp / Single Page Applications using JSON driven API back end build/dev",
			"Any screen / device UI frameworks: Bootstrap, Foundation, Polymer or any UI framework of preference",
			"Mobile Specific: Sencha, Ratchet, Famo.us, Ionic, Ember or Angular + Phonegap or Cordova",
			"Node: RESTful API development using Node + Express, Hapi, Restify, and Koa",
			"Wordpress:  core customization and custom theme / templates"
		]
	}, {
		title: "Front End UI/UX Technologies",
		skillList: [
			"HTML5 (DOM, BOM, CSSOM, dataTypes and data binding/persistence, advanced browser / vendor API's \"Chrome / Mozilla specific\" )",
			"Deep working and production knowledge of the most popular APIs available: Facebook, Twitter, Google (Maps), videoJS",
			"Advanced OO JavaScript for the browser/DOM using Crockford / Osamni / Resig / JSiS best practices",
			"CSS3 enhanced for performance and mobile ( modernizr, polyfills, preprocessors: LESS, SASS/Compass )",
			"Markdown for enhanced security",
			"Enhancements, interaction and elegent UI transitions using CSS3, HTML5, Canvas, WebGL and JS: custom matrix2d/3d transforms usin rAf)",
			"Customized animations Canvas, HTML5 and CSS3 or using a framework such as Famo.us, Velocity.js, GSAP, jQuery or native JS"
		]
	}, {
		title: "Javascript (Frameworks, stack and tools)",
		skillList: [
			"Desktop / WebApp / SPA: Stack of choice is: MEAN.js, Node, Angular, Ember, Express, MongoDB/Mongoose",
			"Mobile / Touch: Stack of choice is Ionic/Angular, Famo.us / Angular,  Ember / PhoneGap/Cordova",
			"Any screen / device UI frameworks: Bootstrap, Foundation, Polymer or any UI framework of preference",
			"Tooling: Grunt, Gulp, Yeoman, npm, bower, AWS, git (gitHub)",
			"Node: RESTful API development using Node + Express, Hapi, Restify, Koa",
			"Dependency Injection: CommonJS, AMD, Browserify"
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