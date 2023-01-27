create table tina4site_component (
	id PRIMARY KEY AUTOINCREMENT NOT NULL,
	name varchar(1000),
	html varchar(1000),
	css varchar(1000),
	icon varchar(1000),
	group_id INT references tina4site_component_group(id) ON DELETE CASCADE,
    api_code VARCHAR(256),
    enabled BOOLEAN,
    created_at DateTime CURRENT_TIMESTAMP
)