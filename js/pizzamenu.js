//Referecing and based on Mikhail PaddyCaffe's https://github.com/mikhail-cct/xml-bootcamp

//Function to get the selection and show the total price
function cart(idPizzaMenu) {
    var total = 0;
    var input = 0;
    var tags = document.querySelectorAll('input');

    //Loop for selecting menu
    for(i = 0; i < tags.length; i++){
        if(tags[i].checked){
            var TR = getParentTag(tags[i], 'TR');
            var TDPrice = TR.getElementsByTagName('TD'[3]);
            total += parseFloat(TDPrice.firstChild.data);
        };
    };
    //Returing the price in decimal
    return Math.round(total * 100.0) / 100.0;
};
