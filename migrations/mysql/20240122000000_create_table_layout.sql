create table layout (
	id integer default 0 not null,
	name varchar(255) default 'default' not null,
	website_id integer default 1 not null references site(id) on update cascade on delete cascade,
	date_created timestamp default null,
	date_modified timestamp default null,
	layout_type varchar(20) default 'page' not null,
	page_layout longblob default null,
    page_layout_html longblob default null,
   primary key (id)
)