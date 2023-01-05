# Tech Check

### Running

1. To run first version: `npm run dev:thread`
2. To run second version `npm run dev`

First version has a mix of async and worker threads, and second version is using only async logic

Execution time of the second version is kinda better, but in the time calculation I didn't cater for the time it takes to spawn up a new thread.

