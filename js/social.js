var user = document.getElementById("users");
var profile = document.getElementById("profile");
var friend = document.getElementById("friend");
var friendOfFriend = document.getElementById("friends_of_friends");
var suggested = document.getElementById("suggested");
var friendsElement = document.getElementById("friends");
var friendsOfFriendsElement = document.getElementById("friends-of-friends");
var friendsSuggestedElement = document.getElementById("friends-suggested");
var f_name = document.createElement("H5");
var field = document.createElement("H5");
var age = document.createElement("p");
var gender = document.createElement("p");
var members = [];
var friendsArray = [];
var tempFriends = [];
var tempFriedsOfFriendsArray = [];
var tempSuggestedArray = [];
var tempSuggestArray = [];

$.getJSON('json/data.json', function(data) {
    for( var i in data) {
        var option = document.createElement("option");
    	option.innerHTML = data[i].firstName +" "+ data[i].surname;
    	option.value = data[i].id;
    	user.append(option);
        members.push(data[i]);
        
    }
    var id = user.value;
    f_name.innerHTML ="<b>Full name: </b>" + data[0].firstName +" "+ data[0].surname;
    age.innerHTML = "<b>Age: </b>" + data[0].age;
	gender.innerHTML = "<b>Gender: </b>" + data[0].gender;

    profile.append(f_name);
    profile.append(age);
    profile.append(gender);
    
    user.addEventListener("change", function() {
    	profil();
    });
    friendsElement.addEventListener("click", function() {
    	friends(id);
    });

    friendsOfFriendsElement.addEventListener("click", function() {
    	friendsOfFriends(id);
    });

    friendsSuggestedElement.addEventListener("click", function() {
    	suggestedFriends(id);
    });
});

function profil() {

    var id = user.value;
	for (var i in members) {
		if (members[i].id == id) {
			f_name.innerHTML ="<b>Full name: </b>" + members[i].firstName +" "+ members[i].surname;
			age.innerHTML = "<b>Age: </b>" + members[i].age;
			gender.innerHTML = "<b>Gender: </b>" + members[i].gender;
		}
	}
}

function friends(id) {
    tempSuggestedArray = [];
    tempFriedsOfFriendsArray = [];
    tempFriends = [];
    friendsArray = [];
    var id = user.value;
    for( var person in members) {
        if (members[person].id == id) {
            tempFriends.push(members[person].friends);
            localStorage.setItem('id', tempFriends);
        }
    }
    for ( var j in tempFriends) {
        for (var person in members){
            for (var id in tempFriends[j]) {
                if(members[person].id == tempFriends[j][id]) {
                    friendsArray.push(members[person]);
                    
                }
            }
        }
    }
    friend.innerHTML = "";
    for(var k in friendsArray) {
        field =friendsArray[k].firstName +" "+ friendsArray[k].surname+","+"\n";
        friend.style.display = 'block';
        friendOfFriend.style.display = 'none';
        suggested.style.display = 'none';
        tempFriedsOfFriendsArray = [];
        tempSuggestedArray = [];
        tempSuggestArray = [];
        friend.append(field);
    }
}

function friendsOfFriends(id) {
    friends(id);
    for ( var i in friendsArray) {
        for (var y in friendsArray[i].friends) {
            tempFriends.push(friendsArray[i].friends[y]);
        }
    }
    tempFriends.slice().sort();
    tempFriends = Array.from(new Set(tempFriends));
    for ( var j in tempFriends) {
        for (var person in members){
            if(members[person].id == tempFriends[j]) {
                tempFriedsOfFriendsArray.push(members[person]);
            }
        }
    }
    var id = user.value;
    friendOfFriend.innerHTML = "";
    for (var obj in tempFriedsOfFriendsArray) {
        function removeItem(tempFriedsOfFriendsArray, id){
            for(var i in tempFriedsOfFriendsArray){
                if(tempFriedsOfFriendsArray[i].id==id){
                    tempFriedsOfFriendsArray.splice(i,1);
                    break;
                }
            }
        }
        function removeItem1(tempFriedsOfFriendsArray, id){
            var id1 = localStorage.getItem("id");
            for(var i in tempFriedsOfFriendsArray){
                if(tempFriedsOfFriendsArray[i].id==id1){
                    tempFriedsOfFriendsArray.splice(i,1);
                    break;
                }
            }
        }

        removeItem(tempFriedsOfFriendsArray, id);
        removeItem1(tempFriedsOfFriendsArray, id);
        field = tempFriedsOfFriendsArray[obj].firstName +" "+ tempFriedsOfFriendsArray[obj].surname+","+"\n";
        friend.style.display = 'none';
        friendOfFriend.style.display = 'block';
        suggested.style.display = 'none';
        friendOfFriend.append(field);
    }
}

function suggestedFriends(id) {
    friendsOfFriends(id);
    for (var j in tempFriedsOfFriendsArray) {
                tempSuggestedArray = [];
        for (var sug in tempFriedsOfFriendsArray[j].friends) {
                tempSuggestedArray.push(tempFriedsOfFriendsArray[j].friends[sug]);
        }
    }
    tempSuggestedArray.slice().sort();
    tempSuggestedArray = Array.from(new Set(tempSuggestedArray));
    for ( var j in tempSuggestedArray) {
        for (var person in members){
            if(members[person].id == tempSuggestedArray[j]) {
                tempSuggestArray.push(members[person]); 
            }
        }
    }
    
    suggested.innerHTML = "";
    for(var k in tempSuggestArray){
        function removeItem(tempSuggestArray, id){
            var id1 = localStorage.getItem("id");
            for(var i in tempSuggestArray){
                if(tempSuggestArray[i].id==id1){
                    tempSuggestArray.splice(i,1);
                    break;
                }
            }
        }
        removeItem(tempSuggestArray, id);
        field = tempSuggestArray[k].firstName +" "+ tempSuggestArray[k].surname+","+"\n";
        friend.style.display = 'none';
        friendOfFriend.style.display = 'none';
        suggested.style.display = 'block';
        suggested.append(field);
    }

}
