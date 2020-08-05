const timeTravel = (store, mutations, index) => {
  if (mutations && mutations.length) {
    const updatedSlices = {}
    const from = index === undefined ? mutations.length - 1 : index

    for (let i = from; i >= 0; i--) {
      for (const sliceName in mutations[i].updatedSlices) {
        if (!updatedSlices[sliceName]) {
          updatedSlices[sliceName] = mutations[i].updatedSlices[sliceName].newState
        }
      }
    }

    store.syntheticUpdate(updatedSlices)
  }
}

export default timeTravel
