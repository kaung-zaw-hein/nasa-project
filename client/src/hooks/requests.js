const API_URL = 'v1';

// Load planets and return as JSON.
async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
   // Load launches and return as JSON.
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches =  await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
 try{
  return await fetch(`${API_URL}/launches`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
  });
 }
 catch(err){
   return {
     ok:false,
   }
 }
  // Submit given launch data to launch system.
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch(err) {
    console.log(err);
    return {
      ok: false,
    };
  }
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};