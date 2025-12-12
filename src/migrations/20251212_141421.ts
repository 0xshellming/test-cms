import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`book_summaries_metadata_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`book_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`book_summaries_metadata_tags_order_idx\` ON \`book_summaries_metadata_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries_metadata_tags_parent_id_idx\` ON \`book_summaries_metadata_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`book_summaries_keypoints\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`index\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`book_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`book_summaries_keypoints_order_idx\` ON \`book_summaries_keypoints\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries_keypoints_parent_id_idx\` ON \`book_summaries_keypoints\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`book_summaries_keypoints_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`book_summaries_keypoints\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`book_summaries_keypoints_locales_locale_parent_id_unique\` ON \`book_summaries_keypoints_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`book_summaries_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`index\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`book_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`book_summaries_faq_order_idx\` ON \`book_summaries_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries_faq_parent_id_idx\` ON \`book_summaries_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`book_summaries_faq_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`book_summaries_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`book_summaries_faq_locales_locale_parent_id_unique\` ON \`book_summaries_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`book_summaries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`author\` text,
  	\`metadata_page_count\` text,
  	\`metadata_rating_value\` text,
  	\`metadata_ratings_count\` text,
  	\`cover_id\` integer,
  	\`cover_url\` text,
  	\`published_date\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`book_summaries_slug_idx\` ON \`book_summaries\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries_cover_idx\` ON \`book_summaries\` (\`cover_id\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries_updated_at_idx\` ON \`book_summaries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries_created_at_idx\` ON \`book_summaries\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries__status_idx\` ON \`book_summaries\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`book_summaries_locales\` (
  	\`title\` text,
  	\`desc\` text,
  	\`about_author\` text,
  	\`summary\` text,
  	\`chapter_summary\` text,
  	\`review\` text,
  	\`summary_reviews\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`seo_keywords\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`book_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`book_summaries_locales_locale_parent_id_unique\` ON \`book_summaries_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`book_summaries_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`topics_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`book_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`topics_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`book_summaries_rels_order_idx\` ON \`book_summaries_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries_rels_parent_idx\` ON \`book_summaries_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries_rels_path_idx\` ON \`book_summaries_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`book_summaries_rels_topics_id_idx\` ON \`book_summaries_rels\` (\`topics_id\`);`)
  await db.run(sql`CREATE TABLE \`_book_summaries_v_version_metadata_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_book_summaries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_metadata_tags_order_idx\` ON \`_book_summaries_v_version_metadata_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_metadata_tags_parent_id_idx\` ON \`_book_summaries_v_version_metadata_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_book_summaries_v_version_keypoints\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`index\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_book_summaries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_keypoints_order_idx\` ON \`_book_summaries_v_version_keypoints\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_keypoints_parent_id_idx\` ON \`_book_summaries_v_version_keypoints\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_book_summaries_v_version_keypoints_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_book_summaries_v_version_keypoints\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_book_summaries_v_version_keypoints_locales_locale_parent_id\` ON \`_book_summaries_v_version_keypoints_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_book_summaries_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`index\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_book_summaries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_faq_order_idx\` ON \`_book_summaries_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_faq_parent_id_idx\` ON \`_book_summaries_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_book_summaries_v_version_faq_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_book_summaries_v_version_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_book_summaries_v_version_faq_locales_locale_parent_id_uniqu\` ON \`_book_summaries_v_version_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_book_summaries_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_author\` text,
  	\`version_metadata_page_count\` text,
  	\`version_metadata_rating_value\` text,
  	\`version_metadata_ratings_count\` text,
  	\`version_cover_id\` integer,
  	\`version_cover_url\` text,
  	\`version_published_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`book_summaries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_parent_idx\` ON \`_book_summaries_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_version_slug_idx\` ON \`_book_summaries_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_version_cover_idx\` ON \`_book_summaries_v\` (\`version_cover_id\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_version_updated_at_idx\` ON \`_book_summaries_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_version_created_at_idx\` ON \`_book_summaries_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_version_version__status_idx\` ON \`_book_summaries_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_created_at_idx\` ON \`_book_summaries_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_updated_at_idx\` ON \`_book_summaries_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_snapshot_idx\` ON \`_book_summaries_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_published_locale_idx\` ON \`_book_summaries_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_latest_idx\` ON \`_book_summaries_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_book_summaries_v_locales\` (
  	\`version_title\` text,
  	\`version_desc\` text,
  	\`version_about_author\` text,
  	\`version_summary\` text,
  	\`version_chapter_summary\` text,
  	\`version_review\` text,
  	\`version_summary_reviews\` text,
  	\`version_seo_meta_title\` text,
  	\`version_seo_meta_description\` text,
  	\`version_seo_keywords\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_book_summaries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_book_summaries_v_locales_locale_parent_id_unique\` ON \`_book_summaries_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_book_summaries_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`topics_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_book_summaries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`topics_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_rels_order_idx\` ON \`_book_summaries_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_rels_parent_idx\` ON \`_book_summaries_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_rels_path_idx\` ON \`_book_summaries_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_book_summaries_v_rels_topics_id_idx\` ON \`_book_summaries_v_rels\` (\`topics_id\`);`)
  await db.run(sql`CREATE TABLE \`youtube_summaries_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`youtube_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`youtube_summaries_tags_order_idx\` ON \`youtube_summaries_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`youtube_summaries_tags_parent_id_idx\` ON \`youtube_summaries_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`youtube_summaries_timestamp_notes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`timestamp\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`youtube_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`youtube_summaries_timestamp_notes_order_idx\` ON \`youtube_summaries_timestamp_notes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`youtube_summaries_timestamp_notes_parent_id_idx\` ON \`youtube_summaries_timestamp_notes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`youtube_summaries_timestamp_notes_locales\` (
  	\`note\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`youtube_summaries_timestamp_notes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`youtube_summaries_timestamp_notes_locales_locale_parent_id_u\` ON \`youtube_summaries_timestamp_notes_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`youtube_summaries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`lang\` text DEFAULT 'en',
  	\`video_info_video_id\` text,
  	\`video_info_video_url\` text,
  	\`video_info_channel\` text,
  	\`video_info_channel_url\` text,
  	\`video_info_duration\` text,
  	\`video_info_view_count\` text,
  	\`video_info_like_count\` text,
  	\`video_info_publish_date\` text,
  	\`thumbnail_id\` integer,
  	\`thumbnail_url\` text,
  	\`raw_content\` text,
  	\`published_date\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`youtube_summaries_slug_idx\` ON \`youtube_summaries\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`youtube_summaries_thumbnail_idx\` ON \`youtube_summaries\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`youtube_summaries_updated_at_idx\` ON \`youtube_summaries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`youtube_summaries_created_at_idx\` ON \`youtube_summaries\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`youtube_summaries__status_idx\` ON \`youtube_summaries\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`youtube_summaries_locales\` (
  	\`title\` text,
  	\`desc\` text,
  	\`summary\` text,
  	\`key_points\` text,
  	\`review\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`youtube_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`youtube_summaries_locales_locale_parent_id_unique\` ON \`youtube_summaries_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`youtube_summaries_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`youtube_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`youtube_summaries_rels_order_idx\` ON \`youtube_summaries_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`youtube_summaries_rels_parent_idx\` ON \`youtube_summaries_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`youtube_summaries_rels_path_idx\` ON \`youtube_summaries_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`youtube_summaries_rels_categories_id_idx\` ON \`youtube_summaries_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_youtube_summaries_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_youtube_summaries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_version_tags_order_idx\` ON \`_youtube_summaries_v_version_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_version_tags_parent_id_idx\` ON \`_youtube_summaries_v_version_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_youtube_summaries_v_version_timestamp_notes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`timestamp\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_youtube_summaries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_version_timestamp_notes_order_idx\` ON \`_youtube_summaries_v_version_timestamp_notes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_version_timestamp_notes_parent_id_idx\` ON \`_youtube_summaries_v_version_timestamp_notes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_youtube_summaries_v_version_timestamp_notes_locales\` (
  	\`note\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_youtube_summaries_v_version_timestamp_notes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_youtube_summaries_v_version_timestamp_notes_locales_locale_\` ON \`_youtube_summaries_v_version_timestamp_notes_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_youtube_summaries_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_lang\` text DEFAULT 'en',
  	\`version_video_info_video_id\` text,
  	\`version_video_info_video_url\` text,
  	\`version_video_info_channel\` text,
  	\`version_video_info_channel_url\` text,
  	\`version_video_info_duration\` text,
  	\`version_video_info_view_count\` text,
  	\`version_video_info_like_count\` text,
  	\`version_video_info_publish_date\` text,
  	\`version_thumbnail_id\` integer,
  	\`version_thumbnail_url\` text,
  	\`version_raw_content\` text,
  	\`version_published_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`youtube_summaries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_parent_idx\` ON \`_youtube_summaries_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_version_version_slug_idx\` ON \`_youtube_summaries_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_version_version_thumbnail_idx\` ON \`_youtube_summaries_v\` (\`version_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_version_version_updated_at_idx\` ON \`_youtube_summaries_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_version_version_created_at_idx\` ON \`_youtube_summaries_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_version_version__status_idx\` ON \`_youtube_summaries_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_created_at_idx\` ON \`_youtube_summaries_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_updated_at_idx\` ON \`_youtube_summaries_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_snapshot_idx\` ON \`_youtube_summaries_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_published_locale_idx\` ON \`_youtube_summaries_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_latest_idx\` ON \`_youtube_summaries_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_youtube_summaries_v_locales\` (
  	\`version_title\` text,
  	\`version_desc\` text,
  	\`version_summary\` text,
  	\`version_key_points\` text,
  	\`version_review\` text,
  	\`version_seo_meta_title\` text,
  	\`version_seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_youtube_summaries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_youtube_summaries_v_locales_locale_parent_id_unique\` ON \`_youtube_summaries_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_youtube_summaries_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_youtube_summaries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_rels_order_idx\` ON \`_youtube_summaries_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_rels_parent_idx\` ON \`_youtube_summaries_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_rels_path_idx\` ON \`_youtube_summaries_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_youtube_summaries_v_rels_categories_id_idx\` ON \`_youtube_summaries_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`collections_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`featured\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`collections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`collections_items_order_idx\` ON \`collections_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`collections_items_parent_id_idx\` ON \`collections_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`collections_items_locales\` (
  	\`note\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`collections_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`collections_items_locales_locale_parent_id_unique\` ON \`collections_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`collections\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`collection_type\` text DEFAULT 'mixed',
  	\`image_id\` integer,
  	\`image_url\` text,
  	\`display_settings_icon\` text,
  	\`display_settings_bg_color\` text DEFAULT 'bg-gradient-to-br from-blue-500 to-blue-600',
  	\`display_settings_custom_bg_color\` text,
  	\`item_count\` numeric,
  	\`sort_order\` numeric DEFAULT 0,
  	\`display_locations_show_on_homepage\` integer DEFAULT true,
  	\`display_locations_show_in_explore\` integer DEFAULT true,
  	\`display_locations_featured\` integer DEFAULT false,
  	\`stats_view_count\` numeric DEFAULT 0,
  	\`stats_like_count\` numeric DEFAULT 0,
  	\`stats_bookmark_count\` numeric DEFAULT 0,
  	\`published_date\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`collections_slug_idx\` ON \`collections\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`collections_image_idx\` ON \`collections\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`collections_updated_at_idx\` ON \`collections\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`collections_created_at_idx\` ON \`collections\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`collections__status_idx\` ON \`collections\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`collections_locales\` (
  	\`title\` text,
  	\`desc\` text,
  	\`subtitle\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`seo_keywords\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`collections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`collections_locales_locale_parent_id_unique\` ON \`collections_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`collections_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`book_summaries_id\` integer,
  	\`youtube_summaries_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`collections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`book_summaries_id\`) REFERENCES \`book_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`youtube_summaries_id\`) REFERENCES \`youtube_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`collections_rels_order_idx\` ON \`collections_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`collections_rels_parent_idx\` ON \`collections_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`collections_rels_path_idx\` ON \`collections_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`collections_rels_book_summaries_id_idx\` ON \`collections_rels\` (\`book_summaries_id\`);`)
  await db.run(sql`CREATE INDEX \`collections_rels_youtube_summaries_id_idx\` ON \`collections_rels\` (\`youtube_summaries_id\`);`)
  await db.run(sql`CREATE INDEX \`collections_rels_posts_id_idx\` ON \`collections_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`_collections_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`featured\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_collections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_collections_v_version_items_order_idx\` ON \`_collections_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_version_items_parent_id_idx\` ON \`_collections_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_collections_v_version_items_locales\` (
  	\`note\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_collections_v_version_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_collections_v_version_items_locales_locale_parent_id_unique\` ON \`_collections_v_version_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_collections_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_collection_type\` text DEFAULT 'mixed',
  	\`version_image_id\` integer,
  	\`version_image_url\` text,
  	\`version_display_settings_icon\` text,
  	\`version_display_settings_bg_color\` text DEFAULT 'bg-gradient-to-br from-blue-500 to-blue-600',
  	\`version_display_settings_custom_bg_color\` text,
  	\`version_item_count\` numeric,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_display_locations_show_on_homepage\` integer DEFAULT true,
  	\`version_display_locations_show_in_explore\` integer DEFAULT true,
  	\`version_display_locations_featured\` integer DEFAULT false,
  	\`version_stats_view_count\` numeric DEFAULT 0,
  	\`version_stats_like_count\` numeric DEFAULT 0,
  	\`version_stats_bookmark_count\` numeric DEFAULT 0,
  	\`version_published_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`collections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_collections_v_parent_idx\` ON \`_collections_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_version_version_slug_idx\` ON \`_collections_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_version_version_image_idx\` ON \`_collections_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_version_version_updated_at_idx\` ON \`_collections_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_version_version_created_at_idx\` ON \`_collections_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_version_version__status_idx\` ON \`_collections_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_created_at_idx\` ON \`_collections_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_updated_at_idx\` ON \`_collections_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_snapshot_idx\` ON \`_collections_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_published_locale_idx\` ON \`_collections_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_latest_idx\` ON \`_collections_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_collections_v_locales\` (
  	\`version_title\` text,
  	\`version_desc\` text,
  	\`version_subtitle\` text,
  	\`version_seo_meta_title\` text,
  	\`version_seo_meta_description\` text,
  	\`version_seo_keywords\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_collections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_collections_v_locales_locale_parent_id_unique\` ON \`_collections_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_collections_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`book_summaries_id\` integer,
  	\`youtube_summaries_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_collections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`book_summaries_id\`) REFERENCES \`book_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`youtube_summaries_id\`) REFERENCES \`youtube_summaries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_collections_v_rels_order_idx\` ON \`_collections_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_rels_parent_idx\` ON \`_collections_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_rels_path_idx\` ON \`_collections_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_rels_book_summaries_id_idx\` ON \`_collections_v_rels\` (\`book_summaries_id\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_rels_youtube_summaries_id_idx\` ON \`_collections_v_rels\` (\`youtube_summaries_id\`);`)
  await db.run(sql`CREATE INDEX \`_collections_v_rels_posts_id_idx\` ON \`_collections_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`topics_keywords\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`keyword\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`topics_keywords_order_idx\` ON \`topics_keywords\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`topics_keywords_parent_id_idx\` ON \`topics_keywords\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`topics\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`icon\` text,
  	\`background_color\` text,
  	\`sort\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`topics_slug_idx\` ON \`topics\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`topics_updated_at_idx\` ON \`topics\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`topics_created_at_idx\` ON \`topics\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`topics_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`topics\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`topics_locales_locale_parent_id_unique\` ON \`topics_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`book_summaries_id\` integer REFERENCES book_summaries(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`youtube_summaries_id\` integer REFERENCES youtube_summaries(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`collections_id\` integer REFERENCES collections(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`topics_id\` integer REFERENCES topics(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_book_summaries_id_idx\` ON \`payload_locked_documents_rels\` (\`book_summaries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_youtube_summaries_id_idx\` ON \`payload_locked_documents_rels\` (\`youtube_summaries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_collections_id_idx\` ON \`payload_locked_documents_rels\` (\`collections_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_topics_id_idx\` ON \`payload_locked_documents_rels\` (\`topics_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`book_summaries_metadata_tags\`;`)
  await db.run(sql`DROP TABLE \`book_summaries_keypoints\`;`)
  await db.run(sql`DROP TABLE \`book_summaries_keypoints_locales\`;`)
  await db.run(sql`DROP TABLE \`book_summaries_faq\`;`)
  await db.run(sql`DROP TABLE \`book_summaries_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`book_summaries\`;`)
  await db.run(sql`DROP TABLE \`book_summaries_locales\`;`)
  await db.run(sql`DROP TABLE \`book_summaries_rels\`;`)
  await db.run(sql`DROP TABLE \`_book_summaries_v_version_metadata_tags\`;`)
  await db.run(sql`DROP TABLE \`_book_summaries_v_version_keypoints\`;`)
  await db.run(sql`DROP TABLE \`_book_summaries_v_version_keypoints_locales\`;`)
  await db.run(sql`DROP TABLE \`_book_summaries_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_book_summaries_v_version_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`_book_summaries_v\`;`)
  await db.run(sql`DROP TABLE \`_book_summaries_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_book_summaries_v_rels\`;`)
  await db.run(sql`DROP TABLE \`youtube_summaries_tags\`;`)
  await db.run(sql`DROP TABLE \`youtube_summaries_timestamp_notes\`;`)
  await db.run(sql`DROP TABLE \`youtube_summaries_timestamp_notes_locales\`;`)
  await db.run(sql`DROP TABLE \`youtube_summaries\`;`)
  await db.run(sql`DROP TABLE \`youtube_summaries_locales\`;`)
  await db.run(sql`DROP TABLE \`youtube_summaries_rels\`;`)
  await db.run(sql`DROP TABLE \`_youtube_summaries_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`_youtube_summaries_v_version_timestamp_notes\`;`)
  await db.run(sql`DROP TABLE \`_youtube_summaries_v_version_timestamp_notes_locales\`;`)
  await db.run(sql`DROP TABLE \`_youtube_summaries_v\`;`)
  await db.run(sql`DROP TABLE \`_youtube_summaries_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_youtube_summaries_v_rels\`;`)
  await db.run(sql`DROP TABLE \`collections_items\`;`)
  await db.run(sql`DROP TABLE \`collections_items_locales\`;`)
  await db.run(sql`DROP TABLE \`collections\`;`)
  await db.run(sql`DROP TABLE \`collections_locales\`;`)
  await db.run(sql`DROP TABLE \`collections_rels\`;`)
  await db.run(sql`DROP TABLE \`_collections_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`_collections_v_version_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_collections_v\`;`)
  await db.run(sql`DROP TABLE \`_collections_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_collections_v_rels\`;`)
  await db.run(sql`DROP TABLE \`topics_keywords\`;`)
  await db.run(sql`DROP TABLE \`topics\`;`)
  await db.run(sql`DROP TABLE \`topics_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "categories_id", "tags_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "categories_id", "tags_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
}
