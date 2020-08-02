import a from './modA';

a();

const asyncImpB = import('./modB');
asyncImpB.then(b => b.default())
    .catch(err => console.error(err));
