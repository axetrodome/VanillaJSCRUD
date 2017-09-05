// Listen for form submit
var myForm = document.getElementById('myForm');
// var editBtn = document.getElementById('editBtn');
var selectedIndex = -1;
// var operation = "A";
myForm.addEventListener('submit', saveBookmark);
// Save Bookmark

function saveBookmark(e){
  // Get form values
  e.preventDefault();
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName,siteUrl)){
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } 
  if(selectedIndex == -1) {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }else{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks[selectedIndex] = JSON.stringify({
              name: document.getElementById('siteName').value,
              url: document.getElementById('siteUrl').value
        });
    bookmarks.splice(selectedIndex,1,bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  //refetch bookmarks
  myForm.reset();
  fetchbookmarks();
  return selectedIndex = -1;
}
//delete
function deleteBookmark(name){ //it can be name or url
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].name == name){
      bookmarks.splice(i,1);
    }
  }
  // reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //refetch bookmarks
  fetchbookmarks();

}
function edit(i){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  selectedIndex = i;
  bookmarks[selectedIndex];
  // operation = "E";
  document.getElementById('siteName').value = bookmarks[selectedIndex].name;
  document.getElementById('siteUrl').value = bookmarks[selectedIndex].url;
  // console.log(i);
}
// function update(selectedIndex){
//     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//     bookmarks[selectedIndex] = JSON.stringify({
//               name: document.getElementById('siteName').value,
//               url: document.getElementById('siteUrl').value
//         });
// }
function fetchbookmarks(){
  // get bookmakrs from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //get output id
  var bookmarksResults = document.getElementById('bookmarksResults');
  bookmarksResults.innerHTML = '';
  for(var i = 0;i < bookmarks.length;i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+ name +
                                  '<a class="btn btn-info" target="_blank" href="'+ url +'">Visit</a>'+
                                  '<a onclick="deleteBookmark(\''+ name +'\')" class="btn btn-danger" href="#">Delete</a>'+
                                  '<a class="btn btn-primary" onclick="edit(\''+ i +'\')" href="#">Edit</a>'+
                                  '</h3>'+
                                  '</div>';
  }
  console.log(bookmarks);
}
  function validateForm(siteName,siteUrl){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl || !siteName){
      alert('fill out the fields');
      return false
    }

    if(!siteUrl.match(regex)){
      alert('not valid');
      return false;
    }
    return true;
  }