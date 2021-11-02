const $ = (selector) => {
    return document.querySelector(selector);
}

$('#addReview').addEventListener("submit",(e)=>{
    //$('.alert.alert-danger').hide();
    console.log("Hid");
    if (!$('input#name').val() || !$('select#rating').val() ||
        !$('textarea#review').val()){
        if ($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-danger">' +
                'All fields required, please try again</div>');
        }
        return false;
    }
})