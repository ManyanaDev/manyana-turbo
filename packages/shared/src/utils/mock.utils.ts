export const fakePromise = (data: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
      // reject(data);
    }, 1000);
  });
