var map_list = [],
  node_list = [],
  path_list = [],
  map = {},
  node = {},
  path = {},
  activeMap = 0,
  modeObj = {
    select: true,
    add: false,
    line: false,
    delete: false
  },
  svg, drag, zoom;

var width = 1198,
  height = 836,
  mouseDownNode, mouseUpNode,
  zoomscale = 1,
  zoomtranslate = [0, 0],
  center = [width / 2, height / 2];


$(document).ready(function () {
  svg = d3.select("#topology__map").append("svg")
    .attr('width', width)
    .attr('height', height)
    .on("click", svgClick);

  drag = d3.behavior.drag()
    .origin(function (d) {
      return d;
    })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

  zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

  $('#add__map__submit').click(function () {
    let map_data = new FormData();
    let m_name = $('#m_name').val();
    let m_image = $('#m_image')[0].files[0];
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
      mapListUpdate();
      return;
    } else {
      alert("[Fail] Error has occured");
      $('.close').click();
      return;
    }
  });

  $('#add__node__submit').click(function () {
    let node_data = new FormData();
    let n_ip = $('#n_ip').val();
    let n_hostname = $('#n_hostname').val();
    let n_status = $('#n_status').val();
    let n_kinds = $('#n_kinds').val();
    let n_x = $('#n_x').val();
    let n_y = $('#n_y').val();
    let n_image = $('#n_image')[0].files[0];
    if (n_ip == "" || n_hostname == "" || n_status == "" || n_kinds == "" || n_x == "" || n_y == "" || n_image == "") {
      alert("please check validation");
      return;
    }
    node_data.append("m_id", activeMap);
    node_data.append("n_ip", n_ip);
    node_data.append("n_hostname", n_hostname);
    node_data.append("n_status", n_status);
    node_data.append("n_kinds", n_kinds);
    node_data.append("n_x", n_x);
    node_data.append("n_y", n_y);
    node_data.append("n_image", n_image);
    let result = add_node(node_data);
    if (result != "") {
      alert("[Success] Successfully add node");
      $('.close').click();
      node_list = get_node_list(activeMap);
      nodeListUpdate();
      nodeDraw();
      return;
    } else {
      alert("[Fail] Error has occured");
      $('.close').click();
      return;
    }
  });

  $('#add__path__submit').click(function () {
    let m_id = activeMap;
    let p_start = $("#p_start").val();
    let p_end = $("#p_end").val();
    let p_option = $("#p_option").val();
    let p_color = $("#p_color").val();
    if (p_start == "" || p_end == "" || p_option == "" || p_color == "") {
      alert("please check validation");
      return;
    }
    let path_data = {
      m_id,
      p_start,
      p_end,
      p_option,
      p_color
    }
    path_data = JSON.stringify(path_data);
    let result = add_path(path_data);
    if (result != "") {
      alert("[Success] Successfully path map");
      $('.close').click();
      path_list = get_path_list(activeMap);
      pathListUpdate();
      pathDraw();
      return;
    } else {
      alert("[Fail] Error has occured");
      $('.close').click();
      return;
    }
  });

  $('.add__map__close').click(function () {
    $('#m_name').val('');
    $('#m_image').val('');
  });

  $('.add__node__close').click(function () {
    $('#n_ip').val('');
    $('#n_hostname').val('');
    $('#n_kinds').val('');
    $('#n_x').val('');
    $('#n_y').val('');
  });

  $('.add__node__close').click(function () {
    $('#p_start').val('');
    $('#p_end').val('');
    $('#p_option').val('');
    $('#p_color').val('');
  });
});

function selectMap(m_id) {
  let deleteActiveMap = "#map__list__" + activeMap;
  let ActiveMap = ""
  $(deleteActiveMap).removeClass("active");
  activeMap = m_id;
  ActiveMap = "#map__list__" + activeMap;
  $(ActiveMap).addClass("active");

  node_list = get_node_list(m_id);
  path_list = get_path_list(m_id);
  nodeListUpdate();
  pathListUpdate();
  pathDraw();
  nodeDraw();
}

/* mode */
/* mode */
/* mode */
/* mode */
/* mode */

function modeChange(mode) {
  let ActiveMode;
  for (let key in modeObj) {
    if (modeObj[key] == true) {
      ActiveMode = "#" + key;
      $(ActiveMode).removeClass("active");
    }
    modeObj[key] = false;
  }
  modeObj[mode] = true;
  ActiveMode = "#" + mode;
  $(ActiveMode).addClass("active");
}

/* delete */
/* delete */
/* delete */
/* delete */
/* delete */

function mapDelete(map) {
  event.stopPropagation();
  let map__temp = $(map).attr("id").split("__");
  let m_name = map__temp[2];
  let m_id = map__temp[3];
  let result = confirm("Are you sure you want to delete this map (name : " + m_name + ")?");
  if (result) {
    if (delete_map(m_id) != "") {
      alert("[Success] Successfully delete map");
      mapListUpdate();
      return;
    } else {
      alert("[Fail] Error has occured");
      return;
    }
  } else {
    return;
  }
}

function nodeDelete() {
  if (!modeObj.delete) {
    return;
  }
  let n_hostname = this.id.split("_")[1];
  let n_id = this.id.split("_")[2];
  let result = confirm("Are you sure you want to delete this node (hostname : " + n_hostname + ")?");
  if (result) {
    if (delete_node(n_id) != "") {
      alert("[Success] Successfully delete node");
      node_list = get_node_list(activeMap);
      path_list = get_path_list(activeMap);
      nodeListUpdate();
      pathListUpdate();
      pathDraw();
      nodeDraw();
      return;
    } else {
      alert("[Fail] Error has occured");
      return;
    }
  } else {
    return;
  }
}

function pathDelete() {
  if (!modeObj.delete) {
    return;
  }
  let p_id = this.id.split("_")[1];
  let result = confirm("Are you sure you want to delete this path (p_id : " + p_id + ")?");
  if (result) {
    if (delete_path(p_id) != "") {
      alert("[Success] Successfully delete path");
      path_list = get_path_list(activeMap);
      pathListUpdate();
      pathDraw();
      return;
    } else {
      alert("[Fail] Error has occured");
      return;
    }
  } else {
    return;
  }
}

/* Draw */
/* Draw */
/* Draw */
/* Draw */
/* Draw */

function nodeDraw() {
  svg.selectAll(".node").remove();
  if (node_list == null) {
    return;
  }
  node = svg.selectAll(".node").data(node_list)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("id", function (d) {
      return "n_" + d.n_hostname + "_" + d.n_id;
    }).on("contextmenu", function (data, index) {
      d3.event.stopPropagation();
      var position = d3.mouse(this);
      d3.select('0')
        .style('position', 'absolute')
        .style('left', position[0] + "px")
        .style('top', position[1] + "px")
        .style('display', 'block');
    })
    .on("mousedown", function (d) {
      d3.event.stopPropagation();
      if (modeObj.line) {
        mouseDownNode = d.n_id;
      } else return;
    })
    .on("mouseup", function (d) {
      if (modeObj.line) {
        mouseUpNode = d.n_id;
        if (mouseDownNode == mouseUpNode) {
          return;
        }
        let check = false;
        $.each(path_list, function (index, value) {
          if (value.p_start == mouseDownNode && value.p_end == mouseUpNode) {
            check = true;
          } else if (value.p_start == mouseUpNode && value.p_end == mouseDownNode) {
            check = true;
          } else check = false;
        });
        if (check) {
          alert("중복되는 선이 있다.")
          return;
        }
        $("#p_start").val(mouseDownNode);
        $("#p_end").val(mouseUpNode);
        $("#add__path__modal").modal();
      } else return;
    }).on("click", nodeDelete);

  node.attr('transform', function (d) {
    return "translate(" + d.n_x + "," + d.n_y + ")"
  }).call(drag);

  node.append("image")
    .attr('x', -15)
    .attr('y', -26.5)
    .attr('width', 30)
    .attr('height', 53)
    .attr("xlink:href", function (d) {
      return BASE_URL + "/upload/" + d.n_image;
    });

  node.append("text")
    .attr('dx', 0)
    .attr('dy', 26.5)
    .attr('text-anchor', "middle")
    .text(function (d) {
      return d.n_hostname;
    });
};

function pathDraw() {
  if (path_list == null) {
    return;
  }
  svg.selectAll(".path").remove();
  link = svg.selectAll(".path").data(path_list)
    .enter()
    .append('line')
    .attr('class', "path")
    .attr('id', function (d) {
      return "p_" + d.p_id;
    })
    .style('stroke-width', 2)
    .style('stroke', function (d) {
      return d.p_color;
    }).on("click", pathDelete);;
  link.attr('x1', function (d) {
    let i = node_list.findIndex(n => n.n_id == d.p_start);
    return node_list[i].n_x;
  }).attr('y1', function (d) {
    let i = node_list.findIndex(n => n.n_id == d.p_start);
    return node_list[i].n_y;
  }).attr('x2', function (d) {
    let i = node_list.findIndex(n => n.n_id == d.p_end);
    return node_list[i].n_x;
  }).attr('y2', function (d) {
    let i = node_list.findIndex(n => n.n_id == d.p_end);
    return node_list[i].n_y;
  })
}

function svgClick(d) {
  if (!modeObj.add || activeMap == 0) {
    return;
  }
  $("#n_x").val(d3.mouse(this)[0]);
  $("#n_y").val(d3.mouse(this)[1]);
  $("#add__node__modal").modal();
}


/* d3 */
/* d3 */
/* d3 */
/* d3 */
/* d3 */

function zoomed() {
  svg.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")");
  zoomscale = zoom.scale();
  zoomtranslate = zoom.translate();
}

function dragstarted(d) {
  if (!modeObj.select) {
    return;
  }
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  if (!modeObj.select) {
    return;
  }
  d3.select(this)
    .attr('transform', function (d) {
      d.n_x = d3.event.sourceEvent.offsetX;
      d.n_y = d3.event.sourceEvent.offsetY;
      return "translate(" + d.n_x + "," + d.n_y + ")"
    });
  pathDraw();
}

function dragended(d) {
  if (!modeObj.select) {
    return;
  }
  d3.select(this).classed("dragging", false);
  let location = {
    n_x: d3.event.sourceEvent.offsetX,
    n_y: d3.event.sourceEvent.offsetY
  };
  location = JSON.stringify(location);
  edit_node_location(location, this.id.split("_")[2]);
}


/* list update */
/* list update */
/* list update */
/* list update */
/* list update */

function mapListUpdate() {
  map_list = get_map_list();
  $('.map__list__el').remove();
  $.each(map_list, function (index, item) {
    $('.map__list').append('<li class="map__list__el list__el" id="map__list__' + item.m_id + '" onclick="selectMap(' + item.m_id + ')"> <span class = "map__image list__image"></span> <span class = "map__name" >' + item.m_name + ' </span><i class="fa fa-trash-o map__delete__icon" id="map__delete__' + item.m_name + '__' + item.m_id + '" onclick="mapDelete(this);"></i></li>');
  });
}

function nodeListUpdate() {
  $('.node__list__el').remove();
  $.each(node_list, function (index, item) {
    $('.node__list').append('<li class="node__list__el list__el" id="node__list__' + item.n_id + '"> <span class = "node__image list__image"></span> <span class = "node__name" >' + item.n_hostname + ' </span></li>');
  });
}

function pathListUpdate() {
  $('.path__list__el').remove();
  $.each(path_list, function (index, item) {
    $('.path__list').append('<li class="path__list__el list__el" id="path__list__' + item.p_id + '"> <span class = "path__image list__image"></span> <span class = "path__name" >path' + item.p_id + ' </span></li>');
  });
}

window.onload = function () {
  mapListUpdate();
  nodeListUpdate();
  pathListUpdate();
}