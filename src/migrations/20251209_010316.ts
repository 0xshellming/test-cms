import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`posts_locales\` (
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
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts_locales\` (\`slug\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
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
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v_locales\` (\`version_slug\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_locales\` (
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories_locales\` (\`slug\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_locales_locale_parent_id_unique\` ON \`categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tags_locales\` (
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_slug_idx\` ON \`tags_locales\` (\`slug\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_locales_locale_parent_id_unique\` ON \`tags_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`posts_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`slug\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`excerpt\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`content\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_version_version_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_title\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_slug\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_excerpt\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_content\`;`)
  await db.run(sql`DROP INDEX \`categories_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`slug\`;`)
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`description\`;`)
  await db.run(sql`DROP INDEX \`tags_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`tags\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`tags\` DROP COLUMN \`slug\`;`)
  await db.run(sql`ALTER TABLE \`tags\` DROP COLUMN \`description\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`categories_locales\`;`)
  await db.run(sql`DROP TABLE \`tags_locales\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_title\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_slug\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_content\` text;`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`slug\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`content\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`name\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`slug\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`description\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`ALTER TABLE \`tags\` ADD \`name\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`tags\` ADD \`slug\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`tags\` ADD \`description\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_slug_idx\` ON \`tags\` (\`slug\`);`)
}
