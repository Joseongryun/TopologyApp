function get_path_list(m_id){
  let result;
  $.ajax({
    url: URL_LIST.GET_PATH_LIST.replace("{$m_id}", m_id),
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

function add_path(path_data){
  let result;
  $.ajax({
    url: URL_LIST.ADD_PATH,
    type: "POST",
    async: false,
    dataType: "json",
    data: path_data,
    processData: false,
    contentType: "application/json",
    cache: false,
    success: function (res) {
      result = res;
    },
    error: function (err) {
      console.log(err);
      return;
    }
  });
  return result;
}

function delete_path(p_id){
  let result;
  $.ajax({
    url: URL_LIST.DELETE_PATH.replace("{$p_id}", p_id),
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