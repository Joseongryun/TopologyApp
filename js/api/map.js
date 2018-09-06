function get_map_list() {
  let result;
  $.ajax({
    url: URL_LIST.GET_MAP_LIST,
    type: "GET",
    async: false,
    dataType: "json",
    success: function (res) {
      result = res;
    },
    error: function (err) {
      console.log(err);
      return;
    }
  })
  return result;
}

function get_map(m_id) {
  let result;
  $.ajax({
    url: URL_LIST.GET_MAP.replace("{$m_id}", m_id),
    type: "GET",
    async: false,
    dataType: "json",
    success: function (res) {
      result = res;
    },
    error: function (err) {
      console.log(err);
      return;
    }
  })
  return result;
}

function add_map(map_data) {
  let result;
  $.ajax({
    url: URL_LIST.ADD_MAP,
    type: "POST",
    async: false,
    data: map_data,
    enctype: 'multipart/form-data',
    processData: false,
    contentType: false,
    cache: false,
    success: function (res) {
      result = res;
      return;
    },
    error: function (err) {
      console.log(err);
      return;
    }
  })
  return result;
}

function delete_map(m_id){
  let result;
  $.ajax({
    url: URL_LIST.DELETE_MAP.replace("{$m_id}", m_id),
    type: "DELETE",
    async: false,
    processData: false,
    contentType: false,
    cache: false,
    success: function (res) {
      result = res;
      return;
    },
    error: function (err) {
      console.log(err);
      return;
    }
  })
  return result;
}