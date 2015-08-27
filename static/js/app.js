// see: https://stackoverflow.com/questions/21203111/bootstrap-3-collapsed-menu-doesnt-close-on-click
$(document).on('click','.navbar-collapse.in',function(e) {
    	if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) 
    	{
    		// console.log(e.target);
    		// console.log($(this));
    		$(this).collapse('hide');
    	}
    });

//Due to how HTML5 defines its semantics, the autofocus HTML attribute has no effect in Bootstrap modals.
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

var model = {
		catList: [],
		currentCat: null,
		catPics: ["cat1.jpg", "cat2.jpg", "cat3.jpeg", "cat4.jpg", "cat5.jpeg", ],

		init: function () {
			// generate all the cats
			for (var i = 0; i < this.catPics.length; i++) {
				this.catList.push(this.makeCat({imgUrl: 'static/img/' + this.catPics[i]}));
				// console.log(this.catList[i]);
			};

			// init the current cat
			this.currentCat = this.catList[0];
		},

		makeCat: function(spec){
			var that = {};
			
			// private instance variables
			var name = spec.name || chance.name();
			var imgUrl = spec.imgUrl || '';
			var count = 0;
			
			// declare the public interface
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
			//formView.init();
		},

		getCurrentCat: function () {
			return model.currentCat;
		},

		setCurrentCat: function (cat) {
			model.currentCat = cat;
		},

		getCatList: function () {
			return model.catList;
		},

		updateCat: function (updated) {
			var cat = getCurrentCat;
			cat.name = updated.name;
			cat.imgUrl = updated.imgUrl;
			cat.count = updated.count;
			
			listView.render();
			catView.render();
		}
	};

	var listView = {
		init: function (argument) {
			this.render()
		},

		render: function (argument) {
			
			// this.list = document.getElementById("list");
			this.$list = $('#list').html('')
			
			var cats = controller.getCatList();

			for (var i = 0; i < cats.length; i++) {

				// create new list item
				var $listItem = $('<li>')
					.addClass('list-group-item')
					.html(cats[i].name);

				var $span = $('<span>')
					.addClass('badge')
					.html(cats[i].get_count());

				$listItem.append($span);				
				
				// add event
				$listItem.on('click', (function(cat, i){
					
					return function(e) {
						controller.setCurrentCat(cat); // store the current cat index
						catView.render();
					};
					
				})(cats[i], i)); // use IIFE to bind a cat with a list item
								 // return a function with with the bound data

				this.$list.append($listItem);
			};
		}
	};


	var catView = {		
		// 'this' is the current object

		init: function () {
			var cat = controller.getCurrentCat();

			// the images
			this.$image = $('img:eq(1)');
			this.$image.attr('src', cat.imgUrl);
			
			// the cats name
			this.$name = $('#name').text(cat.name);
			// click count for this current cat
			this.$count = $('#count').text(cat.get_count()); 

			this.$image.on('click', function(e){
				// inc the count and display
				controller.getCurrentCat().inc_count();
				catView.render();
				listView.init();
			});
		},

		render: function () {
			var cat = controller.getCurrentCat();
			var count = cat.get_count();
			
			this.$image.attr('src', cat.imgUrl);
			this.$name.text(cat.name);
			this.$count.text(cat.get_count());
		}
	};

	var formView = {
		init: function () {
			this.submit = document.getElementById('submit');
			this.image.addEventListener('click', function () {
				formView.render();
			})
		},

		render: function (argument) {
			// update the cat data
			// render the list
			// render the view
		}
	}

	// make it all go
	controller.init();