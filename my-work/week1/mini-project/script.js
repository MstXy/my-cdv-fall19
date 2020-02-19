let data = [
    {
        "timestamp": "2020-02-19T11:09:30.677Z",
        "Wechat": 9,
        "Alipay": 9,
        "QQ": 3,
        "TikTok": 1,
        "Bilibili": 9,
        "Taobao": 6,
        "Eleme": 7,
        "Meituan": 1
    },
    {
        "timestamp": "2020-02-19T11:15:38.950Z",
        "Wechat": 10,
        "Alipay": 9,
        "QQ": 6,
        "TikTok": 6,
        "Bilibili": 10,
        "Taobao": 10,
        "Eleme": 10,
        "Meituan": 2
    },
    {
        "timestamp": "2020-02-19T11:16:23.068Z",
        "Wechat": 10,
        "Alipay": 10,
        "QQ": 9,
        "TikTok": 4,
        "Bilibili": 3,
        "Taobao": 8,
        "Eleme": 8,
        "Meituan": 4
    }
]

// the function dates a data
// arrayn as an argument
function averageData(data){
  // new empty array to be filled
  // with data in new structure
  let newData = [];
  // assuming each data point has the same
  // keys/categories, we extract an array of them from the
  // first data point in the array
  // in class we changed it to the last element instead
  // as the first one did not have all the categories filled out
  // there is more thorough ways to do this, but for out purposes
  // now, this will be enough
  let keys = Object.keys(data[0]);
  // now we loop over the keys/categories
  for(let i = 0; i < keys.length; i++){
    // store the current key/category in
    // a variable:
    let key = keys[i];
    // now we will loop over each data point
    // in the data set, check if it has a value
    // for the key/category and add them to
    // a total sum variable
    // as well as count the occurences in order to
    // calulate the averae in the end
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      // check if the key exists
      // for this datapoint
      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    // now calculate the average
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  // return everything when it is done
  return newData;
}

// call the function to transform the data
let transformedData = averageData(data);
console.log(transformedData);




for (var i = 0; i < transformedData.length; i++) {
  let datapoint = transformedData[i];

  let bar = document.createElement('div');
  bar.className = "bar";
  bar.style.width = datapoint.average * 80 + 'px';

  let averageScore = document.createElement('div');
  averageScore.className = "score";
  averageScore.innerHTML = datapoint.average.toFixed(2);

  if (datapoint.name == "Wechat") {
    bar.style.backgroundColor = "#00c71e";
  } else if (datapoint.name == "Alipay") {
    bar.style.backgroundColor = "#2eabff";
  } else if (datapoint.name == "QQ") {
    bar.style.background = "linear-gradient(#000000, #ffcc00, #ff0000)";
  } else if (datapoint.name == "TikTok") {
    bar.style.background = "linear-gradient(#00ffff, #ff2e2e)";
  } else if (datapoint.name == "Bilibili") {
    bar.style.backgroundColor = "#ff7096";
  } else if (datapoint.name == "Taobao") {
    bar.style.backgroundColor = "#ff5900";
  } else if (datapoint.name == "Eleme") {
    bar.style.backgroundColor = "#2eabff";
  } else if (datapoint.name == "Meituan") {
    bar.style.backgroundColor = "#ffcc00";
  }

  bar.style.color = "white";
  bar.innerHTML = datapoint.name;

  document.getElementById('bar_graph').appendChild(bar);
  document.getElementById('score').appendChild(averageScore);
}





transformedData.sort(function(a, b){return b.average - a.average});

for (var i = 0; i < transformedData.length; i++) {
  let datapoint = transformedData[i];

  let bar = document.createElement('div');
  bar.className = "bar";
  bar.style.width = datapoint.average * 80 + 'px';

  let averageScore = document.createElement('div');
  averageScore.className = "score";
  averageScore.innerHTML = datapoint.average.toFixed(2);

  if (datapoint.name == "Wechat") {
    bar.style.backgroundColor = "#00c71e";
  } else if (datapoint.name == "Alipay") {
    bar.style.backgroundColor = "#2eabff";
  } else if (datapoint.name == "QQ") {
    bar.style.background = "linear-gradient(#000000, #ffcc00, #ff0000)";
  } else if (datapoint.name == "TikTok") {
    bar.style.background = "linear-gradient(#00ffff, #ff2e2e)";
  } else if (datapoint.name == "Bilibili") {
    bar.style.backgroundColor = "#ff7096";
  } else if (datapoint.name == "Taobao") {
    bar.style.backgroundColor = "#ff5900";
  } else if (datapoint.name == "Eleme") {
    bar.style.backgroundColor = "#2eabff";
  } else if (datapoint.name == "Meituan") {
    bar.style.backgroundColor = "#ffcc00";
  }

  bar.style.color = "white";
  bar.innerHTML = datapoint.name;

  document.getElementById('sorted_graph').appendChild(bar);
  document.getElementById('sortedScore').appendChild(averageScore);

}

let barClick = 0;
let barClicked = false;
function showBar() {
  if (barClick == 0) {
    document.getElementById('bar_graph').style.display = "block";
    document.getElementById('score').style.display = "block";
    document.getElementById('app').style.display = "block";
    document.getElementById('rate').style.display = "block";
    document.getElementById('sorted_graph').style.display = "none";
    document.getElementById('sortedScore').style.display = "none";
    barClick = 1;
    sortClick = 0;
    window.scrollBy(0, 300);
    barClicked = true;

  }
  else if (barClick == 1) {
    document.getElementById('bar_graph').style.display = "none";
    document.getElementById('score').style.display = "none";
    document.getElementById('app').style.display = "none";
    document.getElementById('rate').style.display = "none";
    barClick = 0;
    sortClick = 0;
  }

}

let sortClick = 0;
function sort() {
  if (sortClick == 0 && barClicked == true) {
    document.getElementById('sorted_graph').style.display = "block";
    document.getElementById('sortedScore').style.display = "block";
    document.getElementById('app').style.display = "block";
    document.getElementById('rate').style.display = "block";
    document.getElementById('bar_graph').style.display = "none";
    document.getElementById('score').style.display = "none"
    sortClick = 1;
    barClick = 0;
    window.scrollBy(0, 300);

  }
  else if (sortClick == 1) {
    document.getElementById('sorted_graph').style.display = "none";
    document.getElementById('sortedScore').style.display = "none";
    document.getElementById('app').style.display = "none";
    document.getElementById('rate').style.display = "none";
    sortClick = 0;
    barClick = 0;

  }

}
