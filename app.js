
  var url = window.location.href.split("/");
  var page = url[url.length-1].split(".")[0];
  if(page==""){page="index"}
  //console.log(page)

  function getCategories() {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/categories.php",
        type: 'GET',
        dataType: 'json',
        success: function(mydata) {
            //alert(JSON.stringify(mydata));
            var size = Object.keys(mydata.categories).length;
            var val = "";
            var i;
            var no = 1;
            for (i = 0; i < size; i++) {
                //if(mydata.data[i].id_film>5){continue;};
                var desc = mydata.categories[i].strCategoryDescription;
                if(desc.length>90){desc=desc.substring(1, 87)+"..."}
                val +=  '<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">'
                val +=    '<div class="cat-service-section">'
                val +=      '<div class="cat-service-inner">'
                val +=        '<div class="cat-service-img">'
                val +=          '<img src="'+mydata.categories[i].strCategoryThumb+'" alt="">'
                val +=        '</div>'
                val +=        '<div class="cat-service-info">'
                val +=          '<h4>'+mydata.categories[i].strCategory+'</h4>'
                val +=          '<p>'+desc+'</p>'
                val +=          '<a href="meals.html?c='+mydata.categories[i].strCategory+'" class="cat-link">Read More</a>'
                val +=        '</div>'
                val +=      '</div>'
                val +=    '</div>'
                val +=  '</div>'
                no++;
            }
            $("#categories").html(val);
        }
    });
  }

  function getMeals(c) {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/filter.php?c="+c,
        type: 'GET',
        dataType: 'json',
        success: function(mydata) {
            //alert(JSON.stringify(mydata));
            var size = Object.keys(mydata.meals).length;
            var val = "";
            var i;
            var no = 1;
            for (i = 0; i < size; i++) {
                val += '<div class="col-lg-3 col-md-6 col-sm-6 col-12">'
                val +=   '<div class="cat-top-dish-section">'
                val +=     '<div class="cat-top-dish-inner">'
                val +=       '<div class="cat-top-dish-img">'
                val +=         '<img src="'+mydata.meals[i].strMealThumb+'" alt="">'
                val +=       '</div>'
                val +=       '<div class="cat-top-dish-info">'
                val +=         '<a href="meals-detail.html?i='+mydata.meals[i].idMeal+'">'
                val +=             '<h4>'+mydata.meals[i].strMeal+'</h4>'
                val +=         '</a>'
                val +=       '</div>'
                val +=     '</div>'
                val +=   '</div>'
                val += '</div>'
                no++;
            }
            $("#meals").html(val);
        }
    });
  }

  function getMealsDetail(i) {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+i,
        type: 'GET',
        dataType: 'json',
        success: function(mydata) {
            //alert(JSON.stringify(mydata));
            var size = Object.keys(mydata.meals).length;
            var val = "";
            var no = 1;
            for (var i = 1; i <= 20; i++) {
                var strIngredient = mydata.meals[0]["strIngredient"+i];
                if(strIngredient==null||strIngredient==""){continue;}
                val +=  '<li>'+strIngredient+'</li>';
                no++;
            }
            $("#ingredient").html(val);
            $("#sc").text(mydata.meals[0].strCategory);
            $("#sm").text(mydata.meals[0].strMeal);
            $("#mn").text(mydata.meals[0].strMeal);
            $("#mi").text(mydata.meals[0].strInstructions);
            $("#mp").attr("src",mydata.meals[0].strMealThumb);
            $("#mv").attr("src",mydata.meals[0].strMealThumb);
            $("#mt").attr("href",mydata.meals[0].strYoutube);
            var width = $("#mv").width();
            $("#mv").height((width/1.8)+"px");
      
        }
    });
  }

  function setSubmenu() {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/categories.php",
        type: 'GET',
        dataType: 'json',
        success: function(mydata) {
            var size = Object.keys(mydata.categories).length;
            var val = "";
            for (var i = 0; i < size; i++) {
                val +=  '<li>'
                val +=    '<a href="meals.html?c='+mydata.categories[i].strCategory+'">'+mydata.categories[i].strCategory+'</a>'
                val +=  '</li>'
            }
            $("#submenu").html(val);
        }
    });
  }

  setSubmenu()
  if(page=="index"){
    getCategories()
  }
  if(page=="meals"){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const c = urlParams.get('c')
    if(c==null||c==""){window.location.href = 'index.html'}
    $("#bc2").text(c);
    $("#title").text(c+" Meals");
    getMeals(c);
  }
  if(page=="meals-detail"){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const i = urlParams.get('i')
    if(i==null||i==""){window.location.href = 'index.html'}
    getMealsDetail(i)
  }
  

    