import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_locales\` (
  	\`title\` text,
  	\`slug\` text,
  	\`excerpt\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`posts_slug_idx\` ON \`posts_locales\` (\`slug\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_excerpt\` text,
  	\`version_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_slug_idx\` ON \`_posts_v_locales\` (\`version_slug\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`categories_locales\` (
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`categories_slug_idx\` ON \`categories_locales\` (\`slug\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`categories_locales_locale_parent_id_unique\` ON \`categories_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`tags_locales\` (
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`tags_slug_idx\` ON \`tags_locales\` (\`slug\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`tags_locales_locale_parent_id_unique\` ON \`tags_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`DROP INDEX IF EXISTS \`posts_slug_idx\`;`)

  // Check if column exists before dropping (SQLite doesn't support DROP COLUMN IF EXISTS)
  // We'll use a try-catch to handle the error gracefully
  try {
    await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`title\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`slug\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`excerpt\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`content\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }

  await db.run(sql`DROP INDEX IF EXISTS \`_posts_v_version_version_slug_idx\`;`)

  // For ADD COLUMN, we need to check if column exists
  // SQLite doesn't support ADD COLUMN IF NOT EXISTS, so we use try-catch
  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`snapshot\` integer;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`published_locale\` text;`)
  } catch (_e) {
    // Column might already exist
  }

  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`,
  )

  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_title\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_slug\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_excerpt\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_content\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }

  await db.run(sql`DROP INDEX IF EXISTS \`categories_slug_idx\`;`)

  try {
    await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`name\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`slug\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`description\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }

  await db.run(sql`DROP INDEX IF EXISTS \`tags_slug_idx\`;`)

  try {
    await db.run(sql`ALTER TABLE \`tags\` DROP COLUMN \`name\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`tags\` DROP COLUMN \`slug\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
  try {
    await db.run(sql`ALTER TABLE \`tags\` DROP COLUMN \`description\`;`)
  } catch (_e) {
    // Column might not exist or already dropped
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`posts_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`categories_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`tags_locales\`;`)
  await db.run(sql`DROP INDEX IF EXISTS \`_posts_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX IF EXISTS \`_posts_v_published_locale_idx\`;`)

  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_title\` text;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_slug\` text;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_excerpt\` text;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_content\` text;`)
  } catch (_e) {
    // Column might already exist
  }

  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`,
  )

  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`snapshot\`;`)
  } catch (_e) {
    // Column might not exist
  }
  try {
    await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`published_locale\`;`)
  } catch (_e) {
    // Column might not exist
  }

  try {
    await db.run(sql`ALTER TABLE \`posts\` ADD \`title\` text;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`posts\` ADD \`slug\` text;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`posts\` ADD \`excerpt\` text;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`posts\` ADD \`content\` text;`)
  } catch (_e) {
    // Column might already exist
  }

  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)

  try {
    await db.run(sql`ALTER TABLE \`categories\` ADD \`name\` text NOT NULL;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`categories\` ADD \`slug\` text NOT NULL;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`categories\` ADD \`description\` text;`)
  } catch (_e) {
    // Column might already exist
  }

  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`categories_slug_idx\` ON \`categories\` (\`slug\`);`,
  )

  try {
    await db.run(sql`ALTER TABLE \`tags\` ADD \`name\` text NOT NULL;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`tags\` ADD \`slug\` text NOT NULL;`)
  } catch (_e) {
    // Column might already exist
  }
  try {
    await db.run(sql`ALTER TABLE \`tags\` ADD \`description\` text;`)
  } catch (_e) {
    // Column might already exist
  }

  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`tags_slug_idx\` ON \`tags\` (\`slug\`);`)
}
