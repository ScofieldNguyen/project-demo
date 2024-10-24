import Project from '@domain/entities/Project';

function getRandomInt(max = 1000) {
  return Math.floor(Math.random() * max);
}

function getRandomDate(start: Date, end: Date) {
  const startTimestamp = start.getTime();
  const endTimestamp = end.getTime();
  const randomTimestamp =
    Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  return new Date(randomTimestamp);
}

export function createRandomProject(): Project {
  const seed = getRandomInt();
  return {
    id: seed,
    name: 'name-' + seed,
    description: 'description-' + seed,
    from: getRandomDate(new Date(2020, 0, 1), new Date(2021, 0, 1)),
    to: getRandomDate(new Date(2020, 0, 1), new Date(2021, 0, 1)),
    budget: seed * 1000,
  };
}
