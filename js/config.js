const BASE_URL = "http://localhost:3001"

const URL_LIST = {
  "GET_MAP_LIST": BASE_URL + "/maps",
  "ADD_MAP": BASE_URL + "/maps",
  "DELETE_MAP": BASE_URL + "/maps/{$m_id}",
  "GET_MAP": BASE_URL + "/maps/{$m_id}",
  "GET_NODE_LIST": BASE_URL + "/nodes/maps/{$m_id}",
  "ADD_NODE": BASE_URL + "/nodes",
  "DELETE_NODE": BASE_URL + "/nodes/{$n_id}",
  "GET_NODE": BASE_URL + "/nodes/{$n_id}",
  "GET_NODE_LOCATION": BASE_URL + "/nodes/location/{$n_id}",
  "EDIT_NODE_BASIC": BASE_URL + "/nodes/basic/{$n_id}",
  "EDIT_NODE_LOCATION": BASE_URL + "/nodes/location/{$n_id}",
  "EDIT_NODE_IMAGE": BASE_URL + "/nodes/image/{$n_id}",
  "GET_PATH_LIST": BASE_URL + "/paths/maps/{$m_id}",
  "ADD_PATH": BASE_URL + "/paths",
  "DELETE_PATH": BASE_URL + "/paths/{$p_id}",
  "GET_PATH": BASE_URL + "/paths/{$p_id}",
  "EDIT_PATH_DESIGN": BASE_URL + "/paths/design/{$p_id}",
}