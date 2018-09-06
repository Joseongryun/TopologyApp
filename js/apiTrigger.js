var map_active;
var node_active;
var path_active;

$(document).ready(function () {
  $('#add__map__submit').click(function () {
    let map_data = new FormData();
    let m_name = $('#m_name_a').val();
    let m_image = $('#m_image_a')[0].files[0];
    if (m_name == "" || m_image == "") {
      alert("please check validation");
      return;
    }
    map_data.append("m_name", m_name);
    map_data.append("m_image", m_image);
    let result = add_map(map_data);
    if (result != "") {
      alert("[Success] Successfully add map");
      $('.close').click();
      window.location.reload();
      return;
    } else {
      alert("[Fail] Error has occured");
      $('.close').click();
      return;
    }
  });

  $('.map__list__el').click(function () {
    let map = $(this);
    if (map_active != null) {
      map_active.removeClass("active");
    }
    map_active = map;
    let m_id = map.attr("id").split("__")[2];
    map.addClass("active");
    node_list = get_node_list(m_id);
    path_list = get_path_list(m_id);
    node_list_update();
    path_list_update();
  })
});

function map__delete(map) {
  event.stopPropagation();
  let map__temp = $(map).attr("id").split("__");
  let m_name = map__temp[2];
  let m_id = map__temp[3];
  let result = confirm("Are you sure you want to delete this map (name : " + m_name + ")?");
  if (result) {
    if (delete_map(m_id) != "") {
      alert("[Success] Successfully delete map");
      window.location.reload();
      return;
    } else {
      alert("[Fail] Error has occured");
      return;
    }
  } else {
    return;
  }
}