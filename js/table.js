//Here starts the creation of our post, select and delete for our tables.
//Referecing and based on Mikhail PaddyCaffe's https://github.com/mikhail-cct/xml-bootcamp

//Add to our table using the selection that will be made by the user.
function productAdd()
{
	$("#post").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#post").append(html);
				select_row();
			}
		});
	};
	$.getJSONuncached("/get/html")
};

//Selection to be made by the user.
function productSelect(){
    $(".table tbody tr[id]").click(function (){
        $(".select").removeClass("select");
        $this.addClass("select");
        var type = $(this).prevAll("tr").children("td[colspan='4']").length -1;
        var product = $(this).attr("id") -1;
        productDelete(type, product);
    })
};

//Delete function
function productDelete(){
    $("delete").click(function(){
        $.ajax (
        {
            url: "post/delete",
            type: 'POST',
            data: { type: ty, product: pro},
            cache: false,
            success: setTimeout(productAdd,1000)
        });
    })
};

//Read the function again
$(document).ready(function(){
    productAdd();
});