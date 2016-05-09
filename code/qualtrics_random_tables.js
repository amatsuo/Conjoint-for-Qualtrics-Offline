Qualtrics.SurveyEngine.addOnload(function() {
  var random_result = sessionStorage.random_result.split(',');
    
  function fill_table(number) {
    
    var table_element = document.getElementById("conjoint_table_" + number);
    
    var label = "Rd_" + (number) + "_";
    
    // Rows
    //var row_elements = new Array();
	var ar = [];
	var const_violation = 1;
      
    while(const_violation > 0){ 
      // the loop repeats while there is a constraint violations 
      const_violation = 0;
      ar = [];
      var tc = [];
      tc['A'] = [];
      tc['B'] = [];

      for (var i = 0;i<random_result.length;i++) {
        var row_element = document.createElement("TR");

        // Row cells
        for (var j=0;j<3;j++) {
          var data_element = document.createElement("TD");

          var random_value = random_result[i];

          if (j !== 0) {
            var random_values_array = [];
            for (var x = 0; x < values_array[random_value].length; x++) {
              random_values_array.push(x);
            }
            var random_index = shuffle(random_values_array);
            var value = values_array[random_value];
            var text = document.createTextNode(value[random_index[0]]);

            // If you want to use different choice names in your embedded data, change the values below
            if (j === 1) {
              var choice = "A";
            } else {
              var choice = "B";
            }
            var new_label = label + choice + "_" + attribute_array[random_value];
            Qualtrics.SurveyEngine.setEmbeddedData(new_label, value[random_index[0]]);
            tc[choice][attribute_array[random_value]] = value[random_index[0]];

          } else {
            var text = document.createElement("B");
            var bolded_text = document.createTextNode(attribute_array[random_value]);

            text.appendChild(bolded_text);
          }

          data_element.appendChild(text); 
          row_element.appendChild(data_element);
        }
        //table_element.appendChild(row_element);
        //row_elements.push(row_element);   

          ar[i] = row_element;
      }
      // check the constraints violation
      var choice_set = ['A', 'B'];

      for(var j=0; j<2; j++){
        var choice = choice_set[j];
        for(var k = 0; k<constraints.length ; k++){
          var c_const = constraints[k];
          var v_score = 0;
          for(var key in c_const){
            if(tc[choice][key] == c_const[key]){
                v_score++;
            }
          }
          if(v_score == 2) {
            const_violation ++;
          }
        }
      }
    }
	
	for (var i = 0;i<random_result.length;i++) {
      table_element.appendChild(ar[i]);
	}


	//alert(tc["A"]['Gender']);   
  }

  // Replace the round number with round number you are on
  fill_table(1);
});