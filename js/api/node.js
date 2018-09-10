function get_node_list(m_id) {
  let result;
  $.ajax({
    url: URL_LIST.GET_NODE_LIST.replace("{$m_id}", m_id),
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

function get_node_location(n_id){
  let result;
  $.ajax({
    url: URL_LIST.GET_NODE_LOCATION.replace("{$n_id}", n_id),
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

function add_node(node_data) {
  let result;
  $.ajax({
    url: URL_LIST.ADD_NODE,
    type: "POST",
    async: false,
    data: node_data,
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

function delete_node(n_id){
  let result;
  $.ajax({
    url: URL_LIST.DELETE_NODE.replace("{$n_id}", n_id),
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


function edit_node_location(location, n_id) {
  let result;
  $.ajax({
    url: URL_LIST.EDIT_NODE_LOCATION.replace("{$n_id}", n_id),
    type: "PUT",
    async: false,
    dataType: "json",
    data: location,
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