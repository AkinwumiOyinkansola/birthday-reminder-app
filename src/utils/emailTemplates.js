const templates = [
  (name) => `🎉 Happy Birthday, ${name}! Wishing you joy and happiness!`,
  (name) => `🥳 Cheers ${name}! May your special day be filled with love.`,
  (name) => `🎂 Happy Birthday ${name}! Another amazing year awaits you.`,
];

function getRandomTemplate(name) {
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex](name);
}

module.exports = getRandomTemplate;
