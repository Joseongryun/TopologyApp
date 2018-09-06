function get_node_list(m_id){
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