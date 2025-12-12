import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251208_170424 from './20251208_170424';
import * as migration_20251209_010316 from './20251209_010316';
import * as migration_20251212_141421 from './20251212_141421';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251208_170424.up,
    down: migration_20251208_170424.down,
    name: '20251208_170424',
  },
  {
    up: migration_20251209_010316.up,
    down: migration_20251209_010316.down,
    name: '20251209_010316',
  },
  {
    up: migration_20251212_141421.up,
    down: migration_20251212_141421.down,
    name: '20251212_141421'
  },
];
