function FirstView() {

	var self = Ti.UI.createView({
		backgroundColor: 'red'
	});

	var blur = require('com.widbook.blur');
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
	var countImage = 0;
	var limitSearch = 10;
	var resultML = [];
	var blackList = [];
	var whiteList = [];
	var MLCategorias = ['Accesorios para Vehículos', 'Animales y Mascotas', 'Antigüedades', 'Arte y Artesanías', 'Bebés', 'Cámaras y Accesorios', 'Celulares y Teléfonos', 'Coleccionables y Hobbies', 'Computación', 'Consolas y Videojuegos', 'Delicatessen y Vinos', 'Deportes y Fitness', 'Electrodomésticos y Aires Ac.', 'Electrónica, Audio y Video', 'Entradas para Eventos', 'Hogar, Muebles y Jardín', 'Industrias y Oficina', 'Instrumentos Musicales', 'Joyas y Relojes', 'Juegos y Juguetes', 'Libros, Revistas y Comics', 'Música, Peliculas y Series', 'Ropa y Accesorios', 'Salud y Belleza'];
	var MLCategoriasNORMA = ['Accesorios%20para%20Vehículos','Animales%20y%20Mascotas','Antigüedades','Arte%20y%20Artesanías','Bebés','Cámaras%20y%20Accesorios','Celulares%20y%20Teléfonos','Coleccionables%20y%20Hobbies','Computación','Consolas%20y%20Videojuegos','Delicatessen%20y%20Vinos','Deportes%20y%20Fitness','Electrodomésticos%20y%20Aires%20Ac.','Electrónica,%20Audio%20y%20Video','Entradas%20para%20Eventos','Hogar,%20Muebles%20y%20Jardín','Industrias%20y%20Oficina','Instrumentos%20Musicales','Joyas%20y%20Relojes','Juegos%20y%20Juguetes','Libros,%20Revistas%20y%20Comics','Música,%20Peliculas%20y%20Series','Ropa%20y%20Accesorios','Salud%20y%20Belleza'];	
	var buscar = [];
	var favTitle = [];
	var favPhoto = [];
	var favPrice = [];
	var favLink = [];


	var mainView = Ti.UI.createView({
		backgroundColor: '#3b3b3b'
	});
	var categoriesView = blur.createView({
		top: 0,
		left: -width,
		width: width,
		height: height,
		translucentStyleLight:false
	});
	var favView = blur.createView({
		top: 0,
		left: width,
		width: width,
		height: height,
		translucentStyleLight:false
	});

//MAIN VIEW
	var logo = Ti.UI.createImageView({
		image: '/assets/logo.png',
		height: 416/2,
		width: 412/2,
		top: 1136/4 - 416/4,
		width: 320 - 412/4 
	});

	var fondo = Ti.UI.createView({
		height: height,
		width: width,
		top: 0,
		left: 0,
		backgroundColor: '#d22c2c'
	});

	var profileButton = Ti.UI.createButton({
		right: 10,
		top: 25,
		height: 25,
		width: 25,
		opacity: 0,
		backgroundImage: '/assets/iconProfile.png'
	});

	var categoriesButton = Ti.UI.createButton({
		left: 0,
		top: 15,
		height: 50,
		width: 50,
		opacity: 0,
		backgroundImage: '/assets/categories.png'
	});

	var tabBar = blur.createView({
		bottom: 0,
		width: width,
		height: 150,
		translucentStyleLight:false
	});

	var titleML = Ti.UI.createLabel({
		top: 10,
		left: 10,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:18, fontFamily:'Avenir-Light'},
		color: 'white'
	});

	var priceML = Ti.UI.createLabel({
		bottom: 10,
		left: 10,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize:35, fontFamily:'AvenirNext-UltraLight'},
		color: 'white'
	});

	var imageVote = Ti.UI.createImageView({
		top: 0,
		left: 0,
		width: Ti.UI.SIZE,
		height: height,
		zIndex: -10,
		backgroundColor: '#3b3b3b'
	});

	fondo.add(profileButton);
	fondo.add(categoriesButton);

	tabBar.add(titleML);
	tabBar.add(priceML);

	mainView.add(tabBar);
	mainView.add(fondo);
	mainView.add(logo);
	mainView.add(imageVote);

//CATEGORIES VIEW
	var categoriesLabel = Ti.UI.createLabel({
		text: 'Categorías',
		color: 'white',
		top: 25,
		left: 20,
		font: {fontSize:18, fontFamily:'Avenir-Heavy'}
	});

	var categoriesBack = Ti.UI.createButton({
		right: 10,
		top: 25,
		height: 27,
		width: 27,
		backgroundImage: '/assets/back.png'
	});

	var categoriesSeparator = Ti.UI.createView({
		backgroundColor: 'white',
		top: 59,
		width: '100%',
		height: 0.5
	});

	var categoriesTable = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.PLAIN,
		top: 60,
		height: height-60,
		scrollable: true,
		backgroundImage: 'none'
	});
		
	var tableData = [],
	form = Ti.UI.createTableViewSection();

	for (var i = 0; i < MLCategorias.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height: 50,
			backgroundImage: 'none',
			backgroundColor:'transparent'
		});

		var titleLabel = Ti.UI.createLabel({
			top: 15,
			left: 15,
			text: MLCategorias[i],
			color: 'white',
			font: {fontSize:16, fontFamily:'Avenir-Light'}
		});

		row.add(titleLabel);
		form.add(row);
	};

	tableData.push(form);
	categoriesTable.setData(tableData);	

	categoriesView.add(categoriesLabel);
	categoriesView.add(categoriesBack);
	categoriesView.add(categoriesSeparator);
	categoriesView.add(categoriesTable);

//FAV VIEW
	var favLabel = Ti.UI.createLabel({
		text: 'Favoritos',
		color: 'white',
		top: 25,
		left: 20,
		font: {fontSize:18, fontFamily:'Avenir-Heavy'}
	});

	var favBack = Ti.UI.createButton({
		right: 10,
		top: 25,
		height: 27,
		width: 27,
		backgroundImage: '/assets/back.png'
	});

	var favSeparator = Ti.UI.createView({
		backgroundColor: 'white',
		top: 59,
		width: '100%',
		height: 0.5
	});

	var favTable = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.PLAIN,
		top: 60,
		height: height-60,
		scrollable: true,
		backgroundImage: 'none',
		editable: true
	});

	loadFavs();

	function loadFavs(){		
		var tableData = [],
		form = Ti.UI.createTableViewSection();

		for (var i = 0; i < whiteList.length; i++) {
			var row = Ti.UI.createTableViewRow({
				height: 100,
				backgroundImage: 'none',
				backgroundColor:'transparent'
			});

			var titleLabel = Ti.UI.createLabel({
				top: 5,
				left: 100,
				text: favTitle[i],
				color: 'white',
				font: {fontSize:16, fontFamily:'Avenir-Light'}
			});

			var priceLabel = Ti.UI.createLabel({
				bottom: 5,
				right: 15,
				text: '$'+favPrice[i],
				color: 'white',
				font: {fontSize:18, fontFamily:'Avenir-Light'}
			});

			var photoRow = Ti.UI.createImageView({
				top: 10,
				left: 10,
				width: 80,
				height: 80,
				image: favPhoto[i]
			});

			row.add(titleLabel);
			row.add(priceLabel);
			row.add(photoRow);
			form.add(row);
		};

		tableData.push(form);
		favTable.setData(tableData);
	};

	favView.add(favLabel);
	favView.add(favBack);
	favView.add(favSeparator);
	favView.add(favTable);

	self.add(mainView);
	self.add(categoriesView);
	self.add(favView);

	logo.animate({
		top: 23,
		left: 320/2 - 15,
		height: 30,
		width: 30,
		duration: 600
	});
	fondo.animate({
		height: 60,
		curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration: 600
	});
  	setTimeout(function(){
  		logo.setImage('/assets/logoMini.png');
  	},400);

  	setTimeout(function(){
		profileButton.animate({
			opacity: 1,
			duration: 300
		});
		categoriesButton.animate({
			opacity: 1,
			duration: 300
		});
  	},600);

  	profileButton.addEventListener('click', function(e){
  		favView.animate({
  			left: 0,
  			duration: 300
  		});
  	});

  	imageVote.addEventListener('swipe', function(e){
		if(e.direction == 'up' && countImage > 0){
  			whiteList.push(ids[countImage]);
  			blackList.push(ids[countImage]);
  			favTitle.push(titles[countImage]);
  			favPrice.push(price[countImage]);
  			favPhoto.push(photos[countImage]);
  			favLink.push(link[countImage]);
  			loadFavs();
  			imageVote.animate({
  				top: -height,
  				width: 0,
  				left: width/2,
  				duration: 600
  			});
	      	setTimeout(function(){
	      		if(countImage < ids.length-1){
		      		imageVote.setTop(0);
		  			countImage = countImage + 1;
		  			imageVote.setImage(photos[countImage]);
		  			titleML.setText(titles[countImage]);
		  			priceML.setText('$'+price[countImage]);
	  			}else{
	  				titleML.setText('');
	  				priceML.setText('');
					tabBar.animate({
						bottom: -150,
						duration: 500
					});
	  				alert('No hay mas productos, agitá el telefono para obtener más');
	  			}
	  			imageVote.setWidth(Ti.UI.SIZE);
  				imageVote.setLeft(0);
	      	},600);
  		};
  		if(e.direction == 'down'){
  			blackList.push(ids[countImage]);
  			imageVote.animate({
  				top: height,
				width: 0,
  				left: width/2,
  				duration: 600
  			});
	      	setTimeout(function(){
	      		if(countImage < ids.length-1){
		      		imageVote.setTop(0);
		  			countImage = countImage + 1;
		  			imageVote.setImage(photos[countImage]);
		  			titleML.setText(titles[countImage]);
		  			priceML.setText('$'+price[countImage]);
	  			}else{
	  				titleML.setText('');
	  				priceML.setText('');
					tabBar.animate({
						bottom: -150,
						duration: 500
					});
	  				alert('No hay mas productos');
	  			}
	  			imageVote.setWidth(Ti.UI.SIZE);
  				imageVote.setLeft(0);	
	      	},600);
  		};
  	});

	categoriesButton.addEventListener('click', function(e){
		categoriesView.animate({
			left: 0,
			duration: 300
		});
	});

	categoriesBack.addEventListener('click', function(e){
		queryML();
		categoriesView.animate({
			left: -width,
			duration: 300
		});
	});

	favBack.addEventListener('click', function(e){
		favView.animate({
			left: width,
			duration: 300
		});
	});

	Ti.Gesture.addEventListener('shake',function(e) {
		queryML();
	});

	categoriesTable.addEventListener('click', function(e){
		if(e.row.hasCheck == true){
			e.row.setHasCheck(false);	
			if (buscar.indexOf(e.index) > -1) {
			    buscar.splice(buscar.indexOf(e.index), 1);
			};
		}else{
			e.row.setHasCheck(true);
			buscar.push(e.index);
		};
	});

	favTable.addEventListener('click', function(e){
		Titanium.Platform.openURL(favLink[e.index]);
	});

//LOAD ML DATA

  	var photos = [];
  	var ids = [];
  	var titles = [];
  	var price = [];
  	var link = [];

  	queryML();

	function queryML(){		
		photos = [];
		ids = [];
		titles = [];
		price = [];
		link = [];
		for (var i = 0; i < buscar.length; i++) {
			imageVote.setImage(null);
			titleML.setText(null);
			priceML.setText(null);
			imageVote.setTop(0);
			countImage = 0;
			tabBar.animate({
				bottom: 0,
				duration: 500
			});
			var url = 'https://api.mercadolibre.com/sites/MLA/search?';
				url += 'q=' + MLCategoriasNORMA[buscar[i]];
				url += '&limit=' + limitSearch;

			var xhr=Titanium.Network.createHTTPClient();    
			xhr.onerror = function(e){ 
				alert('Error de Conexion');
			};
			 
			xhr.open("GET",url);
			xhr.setRequestHeader("content-type", "application/json");
			xhr.send();
			
			xhr.onload = function(){
			 if(this.status == '200'){
			    if(this.readyState == 4){
			    	var jsonObject = JSON.parse(this.responseText);
			    	for (var i = 0; i < jsonObject.results.length; i++) {
			    		var str = jsonObject.results[i].thumbnail;
						var res = str.substring(0, str.length - 5) + 'F.jpg';
						photos.push(res);
						ids.push(jsonObject.results[i].id);
						titles.push(jsonObject.results[i].title);
						price.push(jsonObject.results[i].price);
						link.push(jsonObject.results[i].permalink);
			    	};
			    	Ti.API.info('buscar: '+buscar);
			    	imageVote.setImage(photos[countImage]);
			    	titleML.setText(titles[countImage]);
			    	priceML.setText('$'+price[countImage]);
			    }else{
			      	alert('Error de Conexion');
			    }           
			 }else{
			    alert('Error de Conexion');
			 }              
			};	
		};
	};

	return self;
}

module.exports = FirstView;