var map_list = [];
var node_list = [];
var path_list = [];

$(document).ready(function () {
  $('#m_image_a').change(function () {
    let img = "#img__preview_" + this.id.split("_")[2];
    img_preview(this, $(img));
  });

  $('.add__map__close').click(function () {
    $('#m_name_a').val('');
    $('#m_image_a').val('');
    $('#img__preview_a').attr('src', "");
  });

  

  function img_preview(input, img) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        img.attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  };

  function node_list_update() {}

  function path_list_update() {

  }





});

function map_list_update() {
  map_list = get_map_list();
  $('.map__list__el').remove();
  $.each(map_list, function (index, item) {
    $('.map__list').append('<li class="map__list__el list__el" id="map__list__' + item.m_id + '"> <span class = "map__image list__image"></span> <span class = "map__name" >' + item.m_name + ' </span><i class="fa fa-trash-o map__delete__icon" id="map__delete__' + item.m_name + '__' + item.m_id + '" onclick="map__delete(this);"></i></li>');
  });
}

function node_list_update() {
  $('.node__list__el').remove();
  $.each(node_list, function (index, item) {
    $('.node__list').append('<li class="node__list__el list__el" id="node__list__' + item.n_id + '"> <span class = "node__image list__image"></span> <span class = "node__name" >' + item.n_hostname + ' </span></li>');
  });
}

function path_list_update() {
  $('.path__list__el').remove();
  $.each(path_list, function (index, item) {
    $('.path__list').append('<li class="path__list__el list__el" id="path__list__' + item.p_id + '"> <span class = "path__image list__image"></span> <span class = "path__name" >path' + item.p_id + ' </span></li>');
  });
}

window.onload = function () {
  map_list_update();
  node_list_update();
  path_list_update();
}