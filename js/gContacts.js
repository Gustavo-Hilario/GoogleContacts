/**
 * this is the Auth function to Authenticate the Google user
 * @param {function} callBackFunction -- specify the callback function that will be called on success
 */
function Gauth(authSuccessCallback) {
    var config = {
        'client_id': '173437994395-37f2altagfva3rovf6969s5pn5a9juob.apps.googleusercontent.com',
        'scope': 'https://www.google.com/m8/feeds'
    };
    gapi.auth.authorize(config, function() {
		authSuccessCallback(gapi.auth.getToken()); 
    });
}
/**
 * @param {object} token - it's token object return from google
 * @param {function} callBackFunction -- specify the callback function that will be called on success
 */
function fetch(token,callBackFunction) {
    // console.log(token);
	var jsonObj = [];
    $.ajax({
        url: "https://www.google.com/m8/feeds/contacts/default/full?access_token=" + token.access_token + "&alt=json",
        dataType: 'json',
		beforeSend: function(xhr){xhr.setRequestHeader('GData-Version', '3.0');},
        success: function(data) {
            var dataArray = data.feed.entry;
            for (var i = 0; i < dataArray.length; i++) {
				item = {}
				item["title"] = dataArray[i].title.$t;
				item["email"] = dataArray[i].gd$email[0].address;
				item["phoneNumber"] =  dataArray[i].gd$phoneNumber ? dataArray[i].gd$phoneNumber[0].$t : "";
				item["address"] = dataArray[i].gd$structuredPostalAddress ? dataArray[i].gd$structuredPostalAddress[0].gd$formattedAddress.$t : "";
				jsonObj.push(item);
			}
			///this is the callback function which will call function to handle the output in the HRML page
			callBackFunction(jsonObj);
        }
    });
}