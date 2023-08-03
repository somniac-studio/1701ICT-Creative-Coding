const LEVEL = [];

LEVEL[0] = {
    // Background
    alpha: 127,
    bg: 0,
    color: 255,
    // Boss
    boss: null,
    // Enemies
    enemy: ['basic', 'splitter'],
    enemyWeight: [0.8, 0.2],
    spawnCount: 80,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'dualFire', 'health', 'bomb'],
    itemWeight: [0.49, 0.29, 0.02, 0.18, 0.02]
};

LEVEL[1] = {
    // Background
    alpha: 127,
    bg: 0,
    color: 255,
    // Boss
    boss: 'boss1',
    // Enemies
    enemy: ['basic', 'bomber'],
    enemyWeight: [0.85, 0.15],
    spawnCount: 80,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'dualFire', 'health', 'bomb'],
    itemWeight: [0.45, 0.25, 0.1, 0.18, 0.02]
};

LEVEL[2] = {
    // Background
    alpha: 127,
    bg: '#002000',
    color: '#00FF00',
    // Boss
    boss: null,
    // Enemies
    enemy: ['basic', 'bomber', 'shotgunner'],
    enemyWeight: [0.5, 0.2, 0.3],
    spawnCount: 80,
    spawnTimeMax: 100,
    spawnTimeMin: 20,
    // Items
    dropChance: 0.3,
    item: ['points', 'points2x', 'tripleFire', 'health', 'bomb'],
    itemWeight: [0.45, 0.25, 0.1, 0.18, 0.02]
};
