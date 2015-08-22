// see: https://stackoverflow.com/questions/21203111/bootstrap-3-collapsed-menu-doesnt-close-on-click
$(document).on('click','.navbar-collapse.in',function(e) {
    	if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) 
    	{
    		// console.log(e.target);
    		// console.log($(this));
    		$(this).collapse('hide');
    	}
    });

var model = {
		catList: [],
		currentCat: null,
		catPics: ["cat1.jpg", "cat2.jpg", "cat3.jpeg", "cat4.jpg", "cat5.jpeg", ],

		init: function () {
			// generate all the cats
			for (var i = 0; i < this.catPics.length; i++) {
				this.catList.push(this.makeCat({imgUrl: 'static/img/' + this.catPics[i]})); 
			};

			this.currentCat = this.catList[0];
		},

		makeCat: function(spec){
			var that = {};
			
			// private instance variables
			var name = spec.name || chance.name();
			var imgUrl = spec.imgUrl || '';
			var count = 0;
			
			// decalre the public interface
			var inc_count = function(){
				count = count + 1;
			};

			var get_count = function(){
				return count;
			};
			
			that.inc_count = inc_count;
			that.get_count = get_count;
			
			// private variables made public
			// obj not secure
			that.name = name;
			that.imgUrl = imgUrl;

			return that;
		}
	
	};

	var controller = {
		init: function () {
			model.init();
			listView.init();
			catView.init();
		},

		getCurrentCat: function () {
			return model.currentCat;
		},

		setCurrentCat: function (cat) {
			model.currentCat = cat;
		},

		getCatList: function () {
			return model.catList;
		}
	};

	var listView = {
		init: function (argument) {
			this.list = document.getElementById("list");
			this.cats = controller.getCatList();

			for (var i = 0; i < this.cats.length; i++) {

				// create new list item
				var listItem = document.createElement('li');
				listItem.className = "list-group-item";
				listItem.innerHTML = this.cats[i].name;

				var span = document.createElement('span');
				span.className = "badge";
				span.innerHTML = this.cats[i].get_count();

				listItem.appendChild(span);				
				
				// add event
				listItem.addEventListener('click', (function(cat, i){
					
					return function() {
						controller.setCurrentCat(cat); // store the current cat index
						catView.render();
						this.init();
						console.log(cat);
					};
					
				})(this.cats[i], i)); // use IIFE to bind a cat with a list item

				this.list.appendChild(listItem);
			};
		},

		render: function (argument) {
			// body...
		}
	};


	var catView = {		
		// 'this' is the current object

		init: function () {
			var cat = controller.getCurrentCat();

			// now for the images
			this.image = document.getElementsByTagName('img')[1];
			this.image.src = cat.imgUrl;

			this.name = document.getElementById('name');
			this.name.textContent = cat.name;

			this.count = document.getElementById('count');
			this.count.textContent = cat.get_count(); 

			image.addEventListener('click', function(){
				// inc the count and display
				controller.getCurrentCat().inc_count();
				catView.render();
			});
		},

		render: function () {
			var cat = controller.getCurrentCat();
			var count = cat.get_count();
			
			this.image.src = cat.imgUrl;
			this.name.textContent = cat.name;
			this.count.textContent = cat.get_count();
		}
	};

	// make it all go
	controller.init();