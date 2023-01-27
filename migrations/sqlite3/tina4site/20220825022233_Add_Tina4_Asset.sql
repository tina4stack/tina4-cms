create table tina4site_asset (
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	type varchar(1000),
	url varchar(1000),
	enabled boolean,
	created_at DateTime CURRENT_TIMESTAMP
)