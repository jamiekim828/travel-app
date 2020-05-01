import fetch from 'node-fetch';

function deleteHandle(e) {
  e.preventDefault();

  deleteTravelData('http://localhost:8080/delete');
}

const deleteTravelData = async () => {
  const req = await fetch('http://localhost:8080/all', {
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify()
  });

  try {
    const everyTrip = await req.json();

    console.log('everyTrip', everyTrip);

    removeItem();

    function removeItem(arr) {
      var i = 0;
      while (i < arr.length) {
        var del_button = document.getElementById(`delete_list${i}`);

        if (del_button.clicked == true) {
          console.log('what i', i);
          let thisIndex = arr.indexOf(everyTrip[i]);
          arr.splice(thisIndex, 1);
        }
        return arr;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export { deleteHandle };
