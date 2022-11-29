let d = [];
const fetchQuetion = async () => {
  $.getJSON(
    "http://localhost:3000/NewQuries",

    function (data) {
      var queries = "";
      d = data;

      //iterating through objects
      $.each(data, function (key, value) {
        //construction of rows
        //having rows from the json object
        
        queries += "<tbody><tr>";
        queries += "<td>" + (key + 1) + "</td>";
        queries += "<td>" + value.query + "</td>";
        queries +=
          "<td>" +
          '<button type="button" id="btn"  class="btn btn-danger ml-4" onclick="deleteQuery(this)" value=' +
          key +
          ">Delete</button>" +
          "</td>";
        queries += "<tr></tbody>";
      });
      //inserting rows into the table
      $("#table").append(queries);
    }
  );
};

$(document).ready(function () {
  //fetching data from json file
  fetchQuetion();
});

//delete functionality

async function deleteQuery(it) {
  let text = "Are Your sure want to delete this Query?";
  if (!confirm(text)) {
    return;
  } else {
    const i = it.value;
    console.log(i);
    id = d[i].id;
    await $.ajax({
      url: `http://localhost:3000/NewQuries/${id}`,
      type: "DELETE",
      success: function (result) {
        //  console.log(result);
          // window.location.reload();
          $("td").remove();
      },
    });
  }
  await fetchQuetion();
}

//function to prevent modal from reload

// $('#btn').submit(function(e) {
//     e.preventDefault();
//     // Coding
//     $('#myModal').modal('toggle');
//     //   $('#myModal').modal('hide');
//     return false;
// });
