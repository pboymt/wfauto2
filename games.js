import { parse } from 'yaml';
import { readFile, writeFile } from 'fs/promises';

const fileContent = await readFile('games.yaml', 'utf8');

const config = parse(fileContent);

const output = {
    version: config.version,
    date: new Date(),
    games: []
}

for (const gameConfig of config.games) {
    if (!gameConfig.active) continue;
    const game = {
        text: gameConfig.title,
        children: []
    }
    for (const level of gameConfig.levels) {
        game.children.push({
            text: config.levels.find(l => l.id === level).title,
            id: `${gameConfig.name}-${level}`
        });
    }
    output.games.push(game);
}

await writeFile('games.json', JSON.stringify(output, null, 2));