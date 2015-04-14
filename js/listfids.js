var currentPage = 1;
var wasSegmentSelected = false;
var appName;
var FbPageName;
var _appUrl;
var _sgtId;
var _fbPageLink;
var _urlType = '1';
var _discoverTimeOut = '15000';
var _discoverConTimeOut = '5000';
var $listItems = null;

function decideUrlOrName(str) {
	searchFacebookName(str);
	return false;
}
// Page name Facebook search function
function searchFacebookName(MyQ) {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: 'https://graph.facebook.com/search',
        data: {
            access_token: "511450802262127|MnhPJPe0yb2HyKvfGimL6MsYZd8",
            q: MyQ, // search string
            type: "page", // type of search results
            featureClass: "P",
            style: "full",
            fields: "likes,name,category,picture,link",
            className: "facebookItem",
            selectAction: "facebook",
            limit: 7 // limits number of result per page - default 12
        },
        success: function (data) {
			if(data == 0 || data.data.length == 0){
				 $('#resaults').css('display', 'none');
				 _urlType = 1;
				return false;
				}
            $("#resaults").html('');
            $.each(data.data, function (index, item) {
                var likesText = item.likes + " liked this";
                $("#resaults").append($('<li  class="test1" fbLink="' + item.link + '" fbid="' + item.id + '"  name="' + item.name + '"></li>').append($('<a class="fbPage"></a>').attr('id', item.id).html(item.name + "<br/><span>" + item.category + " " + likesText + "</span>")).prepend($('<img/>').attr('src', item.picture.data.url)));
                $('#resaults').css('display', 'block');
            });
            $listItems = $('.test1');
            $('#resaults li').click(function () {
				_urlType=1;
                _appUrl = $(this).attr('fbid');
                _fbPageLink=$(this).attr('fbLink')
                var fbnametest = $(this).attr('name');
                $('#DiscoveryFbSearch').val(fbnametest);
                $('#HDiscoveryFbSearch').val(_appUrl);
                $('#fbid').val(_appUrl);
                $('#fbPageLink').val(_fbPageLink);
                $('#resaults').css('display', 'none');
                searchFacebookAlbums();
            })
        },
    });
}

$('#DiscoveryFbSearch').keyup(function (e) {
	var key = e.keyCode;
	
	FbPageName = this.value;
	decideUrlOrName(FbPageName);
		
	if (FbPageName == "" || FbPageName == null){
		$('#resaults').css('display', 'none');
	}

});