// import fetch from 'node-fetch';

// function deleteHandle(e) {
//   e.preventDefault();

//   deleteTravelData('http://localhost:8080/delete');
// }

// const deleteTravelData = async () => {
//   const req = await fetch('http://localhost:8080/all', {
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify()
//   });

//   try {
//     const everyTrip = await req.json();

//     console.log('everyTrip', everyTrip);

//     removeItem();

//     function removeItem() {
//       console.log(everyTrip.length);
//       for (let i = 0; i < everyTrip.length; i++) {
//         var del_button = document.getElementById(`delete_list${i}`);

//         if (del_button) {
//           console.log('what i', i);
//           let thisIndex = i;
//           everyTrip.splice(thisIndex, 1);
//           console.log('new everytrip', everyTrip);
//         }
//         return everyTrip;
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export { deleteHandle };
